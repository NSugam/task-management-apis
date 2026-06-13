import redisClient from "../config/redis.config.js";
import Task from "../models/task.model.js";

export const createTask = async (userId, data) => {
    const task = await Task.create({
        userId,
        ...data,
    });

    await redisClient.incr("analytics:tasks_created");
    await redisClient.del(`tasks:${userId}`);
    return task;
};

export const getTasks = async (userId) => {
    const cacheKey = `tasks:${userId}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    await redisClient.set(cacheKey, JSON.stringify(tasks), {
        EX: 60 * 5,
    });
    return tasks;
};

export const updateTask = async (userId, taskId, data) => {
    const task = await Task.findOneAndUpdate(
        { _id: taskId, userId },
        data,
        { new: true }
    );
    if (!task) throw new Error("Task not found");

    await redisClient.incr("analytics:tasks_updated");
    await redisClient.del(`tasks:${userId}`);
    return task;
};

export const deleteTask = async (userId, taskId) => {
    const task = await Task.findOneAndDelete({
        _id: taskId,
        userId,
    });

    if (!task) throw new Error("Task not found");

    await redisClient.incr("analytics:tasks_deleted");
    await redisClient.del(`tasks:${userId}`);

    return task;
};