import cors from "cors";
import express from "express";
import path from "path";
import connectDB from "./src/config/db.config.js";
import sessionMiddleware from "./src/config/session.config.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import { rateLimiter } from "./src/middlewares/rateLimit.middleware.js";
import routes from "./src/routes/index.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("src/public")));
app.set("trust proxy", 1);
app.use(sessionMiddleware);
app.use(rateLimiter);

connectDB();

// if (env.NODE_ENV === 'dev') app.use(consoleLogger);
// if (fileLogger) app.use(fileLogger);

app.use("/api", routes);
app.use(errorHandler);

export default app;