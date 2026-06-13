import * as taskService from "../services/task.service.js";

export const create = async (req, res, next) => {
    try {
        const task = await taskService.createTask(
            req.session.user.id,
            req.body
        );
        res.status(201).json({ success: true, message: "Task created", data: task });
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const tasks = await taskService.getTasks(req.session.user.id);
        res.json({ success: true, data: tasks });
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(
            req.session.user.id,
            req.params.id,
            req.body
        );
        res.json({ success: true, message: "Task updated", data: task, });
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        await taskService.deleteTask(
            req.session.user.id,
            req.params.id
        );
        res.json({ success: true, message: "Task deleted" });
    } catch (err) {
        next(err);
    }
};