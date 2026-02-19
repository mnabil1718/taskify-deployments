import type { SupabaseClient } from "@supabase/supabase-js";
import type { Board, BoardWithDetails, CreateBoardDTO, UpdateBoardDTO } from "../types/board.type.js";
import type { Database } from "../../database.types.js";
import { NotFoundError } from "../utils/errors.js";

export async function createBoard(supabase: SupabaseClient<Database>, req: CreateBoardDTO): Promise<Board> {

    const { data, error } = await supabase.from("boards").insert({
        title: req.title,
        user_id: req.user_id,
        description: req.description ?? null,
    }).select().single();

    if (error) throw error;

    return data!;
}

export async function updateBoard(supabase: SupabaseClient<Database>, req: UpdateBoardDTO): Promise<Board> {

    const { data, error } = await supabase.from("boards").update({
        title: req.title,
        user_id: req.user_id,
        description: req.description ?? null,
    }).eq("id", req.id).select().single();

    if (error) throw error;

    return data!;
}

export async function getAllBoards(supabase: SupabaseClient<Database>): Promise<Board[]> {
    const { data, error } = await supabase
        .from("boards")
        .select();

    if (error) throw error;

    return data;
}


export async function getBoardById(
    supabase: SupabaseClient<Database>,
    board_id: number,
    taskSearch: string = "",
    labelIds: number[] = []
): Promise<BoardWithDetails> {
    const labelFilterPath = labelIds.length > 0 ? 'task_labels!inner(label_id)' : 'task_labels(label_id)';

    let query = supabase
        .from("boards")
        .select(`
          *,
          lists (
            *,
            rank:position,
            tasks (
              *,
              rank:position,
              filter_labels:${labelFilterPath},
              labels:task_labels (
                ...labels (*)
              )
            )
          )
        `)
        .eq("id", board_id);

    if (taskSearch.trim()) {
        query = query.ilike('lists.tasks.title', `%${taskSearch}%`);
    }

    if (labelIds.length > 0) {
        query = query.in('lists.tasks.filter_labels.label_id', labelIds);
    }

    const result = await query
        .order('position', { referencedTable: 'lists', ascending: true })
        .order('position', { referencedTable: 'lists.tasks', ascending: true })
        .order('title', { referencedTable: 'lists.tasks.labels.labels', ascending: true })
        .maybeSingle();

    if (result.error) throw result.error;
    if (!result.data) throw new NotFoundError("Board not found");

    // Optional: Clean up the filter_labels from the final object so FE doesn't see it
    if (result.data.lists) {
        result.data.lists.forEach((list: any) => {
            list.tasks?.forEach((task: any) => {
                delete task.filter_labels;
            });
        });
    }

    return result.data as unknown as BoardWithDetails;
}






export async function deleteBoard(supabase: SupabaseClient<Database>, id: number): Promise<Board> {
    const { data, error } = await supabase.from("boards").delete().eq("id", id).select().single();

    if (error) throw error;
    return data;
}
