import { Router } from "express";
import { getAllAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", getAllAnalytics);

export default router;