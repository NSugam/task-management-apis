import { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import analyticsRoutes from "./analytics.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/analytics", analyticsRoutes);

export default router;