import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteLists, postLists, putLists } from "../controllers/list.controller.js";
import { getTasksForList } from "../controllers/task.controller.js";

const router = Router();
router.get("/:id/tasks", authenticate, getTasksForList);
router.post("/", authenticate, postLists);
router.put("/:id", authenticate, putLists);
router.delete("/:id", authenticate, deleteLists);
export default router;

