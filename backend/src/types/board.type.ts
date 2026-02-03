import type { Tables } from "../../database.types.js";

export type CreateBoardDTO = {
    user_id: string;
    title: string;
    description?: string;
}


export type Board = Tables<"boards">;
