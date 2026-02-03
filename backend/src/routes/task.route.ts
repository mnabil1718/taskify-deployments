import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteTasks, postTasks, putTasks } from "../controllers/task.controller.js";

const router = Router();
router.post("/", authenticate, postTasks);
router.put("/:id", authenticate, putTasks);
router.delete("/:id", authenticate, deleteTasks);
export default router;

