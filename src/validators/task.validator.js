import { body } from "express-validator";

export const createTaskValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ min: 3 })
        .withMessage("Title must be at lest 3 chars"),

    body("description")
        .optional()
        .isString()
        .withMessage("Desc must be a string."),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium, or High"),
];

export const updateTaskValidator = [
    body("title")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Title must be min 3 chars."),

    body("description")
        .optional()
        .isString()
        .withMessage("Desc must be a str."),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium, or High"),
];