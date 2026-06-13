import { RedisStore } from "connect-redis";
import session from "express-session";
import env from "./env.config.js";
import redisClient from "./redis.config.js";

const sessionMiddleware = session({
    store: new RedisStore({
        client: redisClient,
        ttl:
            (Number(env.SESSION_EXPIRY) ||
                1000 * 60 * 60) / 1000,
    }),
    secret: env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge:
            Number(env.SESSION_EXPIRY) ||
            1000 * 60 * 60,
    },
});

export default sessionMiddleware;