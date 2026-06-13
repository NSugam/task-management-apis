import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createTaskValidator, updateTaskValidator } from "../validators/task.validator.js";
const router = Router();

router.use(isAuthenticated);

router.post("/", createTaskValidator, validate, taskController.create);

router.get("/", taskController.getAll);

router.patch("/:id", updateTaskValidator, validate, taskController.update);

router.delete("/:id", taskController.remove);

export default router;