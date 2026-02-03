import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { postLists } from "../controllers/list.controller.js";
import { getTasks } from "../controllers/task.controller.js";

const router = Router();
router.get("/:id/tasks", authenticate, getTasks);
router.post("/", authenticate, postLists);
export default router;

