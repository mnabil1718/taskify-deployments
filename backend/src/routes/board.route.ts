import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getBoards, postBoards } from "../controllers/board.controller.js";

const router = Router();
router.get("/", authenticate, getBoards);
router.post("/", authenticate, postBoards);
export default router;
