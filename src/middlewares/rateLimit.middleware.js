import redisClient from "../config/redis.config.js";

export const rateLimiter = async (req, res, next) => {
    try {
        const userId = req.session?.user?.id;
        const ip = req.ip;
        const key = userId ? `rate:user:${userId}` : `rate:ip:${ip}`;

        const requests = await redisClient.incr(key);

        if (requests === 1) await redisClient.expire(key, 60);

        if (requests > 19) return res.status(429).json({ success: false, message: "Too many requests. Please try again later." });

        next();
    } catch (err) {
        next(err);
    }
};