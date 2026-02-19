import type { Tables } from "../../database.types.js";
import type { Label } from "./label.type.js";

export type Task = Tables<"tasks">;

export type CreateTaskDTO = {
    list_id: number;
    rank: string;
    title: string;
    description?: string;
    deadline?: string; // ISO Date string
}

export type UpdateTaskDTO = {
    id: number;
    list_id: number;
    rank: string;
    title: string;
    description: string;
    deadline: string;
}


export type TaskWitLabels = Task & {
    labels: Label[];
};
