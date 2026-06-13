import { createClient } from "redis";
import env from "./env.config.js";

const redisClient = createClient({
    url: env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

await redisClient.connect();

export default redisClient;