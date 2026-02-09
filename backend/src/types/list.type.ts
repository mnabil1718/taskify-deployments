import type { Tables } from "../../database.types.js";

export type List = Tables<"lists">;

export type CreateListDTO = {
    title: string;
    board_id: number;
    position: number;
}


export type UpdateListDTO = CreateListDTO & { id: number };
