import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_URI:
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/task-management",

    REDIS_URL:
        process.env.REDIS_URL ||
        "redis://localhost:6379",

    SESSION_SECRET:
        process.env.SESSION_SECRET ||
        "secret",

    SESSION_EXPIRY:
        Number(process.env.SESSION_EXPIRY) ||
        3600000,
};

export default env;