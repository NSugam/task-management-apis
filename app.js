import cors from "cors";
import express from "express";

import sessionMiddleware from "./src/config/session.config.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import { rateLimiter } from "./src/middlewares/rateLimit.middleware.js";
import routes from "./src/routes/index.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use(sessionMiddleware);
app.use(rateLimiter);

// if (env.NODE_ENV === 'dev') app.use(consoleLogger);
// if (fileLogger) app.use(fileLogger);

app.use("/api", routes);
app.use(errorHandler);

export default app;