import redisClient from "../config/redis.config.js";

export const getAnalytics = async () => {
    const [
        totalLogins,
        tasksCreated,
        tasksUpdated,
        tasksDeleted,
    ] = await Promise.all([
        redisClient.get("analytics:total_logins"),
        redisClient.get("analytics:tasks_created"),
        redisClient.get("analytics:tasks_updated"),
        redisClient.get("analytics:tasks_deleted"),
    ]);

    return {
        totalLogins: Number(totalLogins || 0),
        tasksCreated: Number(tasksCreated || 0),
        tasksUpdated: Number(tasksUpdated || 0),
        tasksDeleted: Number(tasksDeleted || 0),
    };
};