import { Router } from "express";
const router = Router();

import { login, logout, register } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { sessionInfo } from "../services/auth.service.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

router.post("/register", registerValidator, validate, register);

router.post("/login", loginValidator, validate, login);

router.post("/logout", isAuthenticated, logout);

router.get("/session-info", sessionInfo);

export default router;