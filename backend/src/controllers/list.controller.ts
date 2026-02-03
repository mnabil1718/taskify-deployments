import type { Request, Response } from "express";
import { createList, getAllListByBoardId } from "../services/list.service.js";
import { StatusCodes } from "http-status-codes";
import { success } from "../utils/response.js";

export const postLists = async (req: Request, res: Response) => {
    const supabase = (req as any).supabase;
    const { title, board_id, position } = req.body;

    const list = await createList(supabase,
        {
            title,
            board_id,
            position,
        });

    res.status(StatusCodes.CREATED).json(success("List created successfully", list));
}


export const getLists = async (req: Request, res: Response) => {
    const supabase = (req as any).supabase;
    const { id } = req.params;

    const lists = await getAllListByBoardId(supabase, Number(id));

    res.status(StatusCodes.OK).json(success("Lists fetched successfully", lists));
}
