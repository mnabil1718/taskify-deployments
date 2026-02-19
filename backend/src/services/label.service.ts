import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types.js";
import type { Label } from "../types/label.type.js";
import { NotFoundError } from "../utils/errors.js";

export async function createLabel(supabase: SupabaseClient<Database>, req: { title: string, color: string }): Promise<Label> {
    const { data, error } = await supabase.from("labels").insert({
        title: req.title,
        color: req.color,
    }).select().single();

    if (error) throw error;

    return data!;
}

export async function updateLabel(supabase: SupabaseClient<Database>, req: Label): Promise<Label> {
    const { data, error } = await supabase.from("labels").update({
        title: req.title,
        color: req.color,
    }).eq("id", req.id).select().single();

    if (error) throw error;
    return data!;
}

export async function deleteLabel(supabase: SupabaseClient<Database>, id: number): Promise<Label> {
    const { data, error } = await supabase.from("labels").delete().eq("id", id).select().single();
    if (error) throw error;
    return data!;
}

export async function getLabelById(supabase: SupabaseClient<Database>, id: number): Promise<Label> {
    const { data, error } = await supabase.from("labels").select().eq("id", id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundError("Label not found");
    return data;
}

export async function getAllLabel(supabase: SupabaseClient<Database>, title: string | null): Promise<Label[]> {

    let query = supabase.from("labels").select();

    if (title && title.trim()) {
        query = query.ilike("title", `%${title.trim()}%`)
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
} 

