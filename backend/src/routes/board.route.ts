import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteBoards, getBoards, getBoardsById, postBoards, putBoards } from "../controllers/board.controller.js";
import { getLists } from "../controllers/list.controller.js";

const router = Router();
router.get("/", authenticate, getBoards);
router.get("/:id", authenticate, getBoardsById);
router.get("/:id/lists", authenticate, getLists);
router.post("/", authenticate, postBoards);
router.put("/:id", authenticate, putBoards);
router.delete("/:id", authenticate, deleteBoards);
export default router;
