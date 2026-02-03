import type { Tables } from "../../database.types.js";

export type Task = Tables<"tasks">;

export type CreateTaskDTO = {
    list_id: number;
    position: number;
    title: string;
    description?: string;
    deadline?: string; // ISO Date string
}

export type UpdateTaskDTO = {
    id: number;
    list_id: number;
    position: number;
    title: string;
    description: string;
    deadline: string;
}

