import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getBoards, postBoards } from "../controllers/board.controller.js";
import { getLists } from "../controllers/list.controller.js";

const router = Router();
router.get("/", authenticate, getBoards);
router.get("/:id/lists", authenticate, getLists);
router.post("/", authenticate, postBoards);
export default router;
