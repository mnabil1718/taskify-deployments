import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types.js";
import type { CreateListDTO, List } from "../types/list.type.js";

export async function createList(supabase: SupabaseClient<Database>, req: CreateListDTO): Promise<List> {
    const { data, error } = await supabase.from("lists").insert({
        title: req.title,
        board_id: req.board_id,
        position: req.position,
    }).select().single();

    if (error) throw error;

    return data!;
}


export async function getAllListByBoardId(supabase: SupabaseClient<Database>, board_id: number): Promise<List[]> {
    const { data, error } = await supabase.from("lists").select().eq("board_id", board_id).order("position", { ascending: true });

    if (error) throw error;

    return data!;
}
