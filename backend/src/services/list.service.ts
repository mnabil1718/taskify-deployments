import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types.js";
import type { CreateListDTO, List, UpdateListDTO } from "../types/list.type.js";
import { NotFoundError } from "../utils/errors.js";

export async function createList(supabase: SupabaseClient<Database>, req: CreateListDTO): Promise<List> {
    const { data, error } = await supabase.from("lists").insert({
        title: req.title,
        board_id: req.board_id,
        position: req.position,
    }).select().single();

    if (error) throw error;

    return data!;
}


export async function updateList(supabase: SupabaseClient<Database>, req: UpdateListDTO): Promise<List> {
    const { data, error } = await supabase.from("lists").update({
        title: req.title,
        board_id: req.board_id,
        position: req.position,
    }).eq("id", req.id).select().single();

    if (error) throw error;

    return data!;
}


export async function getListById(supabase: SupabaseClient<Database>, id: number): Promise<List> {
    const { data, error } = await supabase.from("lists").select().eq("id", id).maybeSingle();
    if (error) throw error;

    if (!data) throw new NotFoundError("List not found");

    return data;
}


export async function getAllListByBoardId(supabase: SupabaseClient<Database>, board_id: number): Promise<List[]> {
    const { data, error } = await supabase.from("lists").select().eq("board_id", board_id).order("position", { ascending: true });

    if (error) throw error;

    return data!;
}

export async function getLastList(supabase: SupabaseClient<Database>, board_id: number): Promise<List | undefined> {
    const { data, error } = await supabase.from("lists").select().eq("board_id", board_id).order("position", { ascending: false }).limit(1).single();

    if (error) throw error;

    return data || undefined;
}

export async function deleteList(supabase: SupabaseClient<Database>, id: number): Promise<List> {
    const { data, error } = await supabase.from("lists").delete().eq("id", id).select().single();
    if (error) throw error;
    return data!;
}
