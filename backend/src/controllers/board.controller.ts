import type { Request, Response } from "express";
import { createBoard, getAllBoards } from "../services/board.service.js";
import { StatusCodes } from "http-status-codes";
import { success } from "../utils/response.js";


export const postBoards = async (req: Request, res: Response) => {
    const { id } = (req as any).user;
    const { title, description } = req.body;
    const user_id = String(id);

    const data = await createBoard({
        user_id,
        title,
        description,
    });

    res.status(StatusCodes.CREATED).json(success("Board created successfully", data));
}


export const getBoards = async (req: Request, res: Response) => {
    const { id } = (req as any).user;
    const user_id = String(id);

    const boards = await getAllBoards(user_id);

    res.status(StatusCodes.OK).json(success("Boards fetched successfully", boards));
}

