import { supabase } from "../lib/supabase.js";
import type { Board, CreateBoardDTO } from "../types/board.type.js";


export async function createBoard(req: CreateBoardDTO): Promise<Board> {
    const { data, error } = await supabase.from("board").insert({
        title: req.title,
        user_id: req.user_id,
        description: req.description ?? null,
    }).select().eq("user_id", req.user_id).single();

    if (error) throw error;

    return data!;
}

export async function getAllBoards(user_id: string): Promise<Board[]> {
    const { data, error } = await supabase.from("board").select().eq("user_id", user_id);

    if (error) throw error;

    return data;
}
