import { Router } from "express";
import authRoutes from "./auth.route.js";
import boardRoutes from "./board.route.js";
import listRoutes from "./list.route.js";
import taskRoutes from "./task.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/lists", listRoutes);
router.use("/tasks", taskRoutes);
router.use("/boards", boardRoutes);
router.use("/healthcheck", (_, res) => { res.status(200).json({ status: "operational" }) })
export default router;
