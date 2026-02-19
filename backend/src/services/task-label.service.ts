import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types.js";
import type { TaskLabel } from "../types/task-labels.type.js";


export async function createLabelToTask(supabase: SupabaseClient<Database>, taskId: number, labelId: number): Promise<void> {

    const { error } = await supabase.from("task_labels").insert({
        task_id: taskId,
        label_id: labelId,
    });

    if (error) throw error;
}


export async function deleteLabelToTask(supabase: SupabaseClient<Database>, taskId: number, labelId: number): Promise<void> {

    const { error } = await supabase.from("task_labels").delete().eq("task_id", taskId).eq("label_id", labelId);

    if (error) throw error;
}


export async function selectTaskLabel(supabase: SupabaseClient<Database>, taskId: number, labelId: number): Promise<TaskLabel | null> {

    const { data, error } = await supabase.from("task_labels").select().eq("task_id", taskId).eq("label_id", labelId).maybeSingle();

    if (error) throw error;

    return data;
}




// every other opons will cascade here: e.g. update, create, delete labels
