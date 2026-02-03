import { Router } from "express";
import authRoutes from "./auth.route.js";
import boardRoutes from "./board.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/boards", boardRoutes);
router.use("/healthcheck", (_, res) => { res.status(200).json({ status: "operational" }) })
export default router;
