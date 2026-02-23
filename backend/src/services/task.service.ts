
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types.js";
import type { CreateTaskDTO, Task, TaskWitLabels, UpdateTaskDTO } from "../types/task.type.js";
import { NotFoundError } from "../utils/errors.js";
import type { SortFilter } from "../types/filter.type.js";
import { Lexorank } from "../lib/lexorank.js";

export async function createTask(supabase: SupabaseClient<Database>, req: CreateTaskDTO): Promise<Task> {

    const { data, error } = await supabase.from("tasks").insert({
        title: req.title,
        list_id: req.list_id,
        description: req.description ?? null,
        deadline: req.deadline ?? null,
        position: req.rank,
    }).select("*, rank:position").single();

    if (error) throw error;

    return data!;
}

export async function updateTask(supabase: SupabaseClient<Database>, req: UpdateTaskDTO): Promise<TaskWitLabels> {
    const { data, error } = await supabase
        .from("tasks")
        .update({
            list_id: req.list_id,
            position: req.rank,
            title: req.title,
            description: req.description,
            deadline: req.deadline,
        })
        .eq("id", req.id)
        .select(`
            *,
            labels:task_labels (
                ...labels (*)
            )
        `)
        .single();
    if (error) throw error;
    return data as unknown as TaskWitLabels;
}

export async function deleteTask(supabase: SupabaseClient<Database>, id: number): Promise<Task> {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id).select().single();
    if (error) throw error;
    return data!;
}


export async function getTaskById(supabase: SupabaseClient<Database>, id: number): Promise<Task> {
    const { data, error } = await supabase.from("tasks").select().eq("id", id).maybeSingle();
    if (error) throw error;

    if (!data) throw new NotFoundError("Task not found");

    return data;
}



export async function getAllTaskByListId(
    supabase: SupabaseClient<Database>,
    list_id: number,
    sort: SortFilter | undefined = undefined
): Promise<TaskWitLabels[]> {
    const selectQuery = `
        *,
        rank:position,
        labels:task_labels (
            ...labels (*)
        )
    `;
    const sortColumn = sort?.column === "rank" || !sort
        ? "position"
        : sort.column;
    // 1. Fetch tasks in requested order
    const { data, error } = await supabase
        .from("tasks")
        .select(selectQuery)
        .eq("list_id", list_id)
        .order(sortColumn, { ascending: sort?.ascending ?? true, nullsFirst: false })
        .order('title', { referencedTable: 'task_labels.labels', ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) return [];
    // 2. Guard: if sorting by a non-rank column and ALL values are null, skip re-indexing
    if (sort && sort.column !== "rank") {
        const getCol = (task: any) => (task as Record<string, unknown>)[sort.column];
        const allNull = data.every((task: any) => getCol(task) == null);
        if (allNull) return data as unknown as TaskWitLabels[];

        const lexo = new Lexorank();
        let prevRank: string | null = null;

        const [withValue, withoutValue] = data.reduce<[any[], any[]]>(
            ([a, b], task) => getCol(task) != null ? [[...a, task], b] : [a, [...b, task]],
            [[], []]
        );
        const ordered = [...withValue, ...withoutValue];

        // 3. Clear positions to temporary values to avoid unique constraint collisions
        const clearPromises = ordered.map((task: any) =>
            supabase
                .from("tasks")
                .update({ position: `tmp_${task.id}` })
                .eq("id", task.id)
        );
        const clearResults = await Promise.all(clearPromises);
        const clearError = clearResults.find(r => r.error)?.error;
        if (clearError) throw clearError;

        // 4. Assign new Lexoranks in display order
        const updatePromises = ordered.map((task: any) => {
            const [newRank] = lexo.insert(prevRank, null);
            prevRank = newRank;
            task.rank = newRank;
            task.position = newRank;
            return supabase
                .from("tasks")
                .update({ position: newRank })
                .eq("id", task.id);
        });
        const results = await Promise.all(updatePromises);
        const firstError = results.find(r => r.error)?.error;
        if (firstError) throw firstError;

        // 5. Re-sort data in-place for FE response
        data.sort((a: any, b: any) => {
            const aVal = getCol(a);
            const bVal = getCol(b);
            if (aVal == null) return 1;
            if (bVal == null) return -1;
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return sort.ascending ? cmp : -cmp;
        });
    }
    return data as unknown as TaskWitLabels[];
}
