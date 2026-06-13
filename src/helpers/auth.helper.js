import redisClient from "../config/redis.config.js";

export const isUserBlocked = async (email) => {
    const blocked = await redisClient.get(`login:block:${email}`);
    return blocked ? true : false;
};

export const blockUser = async (email) => {
    await redisClient.set(`login:block:${email}`, "1", {
        EX: 15 * 60, // fr 15 min
    });
};

export const incrementFailedLogin = async (email) => {
    const key = `login:fail:${email}`;
    const attempts = await redisClient.incr(key);
    if (attempts === 1) await redisClient.expire(key, 15 * 60);
    return attempts;
};

export const resetFailedLogin = async (email) => {
    await redisClient.del(`login:fail:${email}`);
};