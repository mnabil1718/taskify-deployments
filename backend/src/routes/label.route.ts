import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteLabels, getLabels, postLabels, putLabels, toggleLabels } from "../controllers/label.controller.js";

const router = Router();
router.get("/", authenticate, getLabels);
router.post("/", authenticate, postLabels);
router.post("/toggle", authenticate, toggleLabels);
router.delete("/:id", authenticate, deleteLabels);
router.put("/:id", authenticate, putLabels);
export default router;
