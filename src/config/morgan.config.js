import fs from "fs";
import morgan from "morgan";
import path from "path";
import env from "./env.config.js";

const isProduction = env.NODE_ENV === "prod";

export const consoleLogger = morgan("dev");

let fileLogger;
let errorOnlyLogs;

if (!isProduction) {
    const logDir = "logs";
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    const logStream = fs.createWriteStream(path.join(logDir, "access.log"), { flags: "a" });

    const errorOnlyLogs = morgan("combined", {
        skip: (req, res) => res.statusCode <= 500,
        stream: logStream,
    });

    fileLogger = morgan("combined", { stream: logStream });

}

export { fileLogger, errorOnlyLogs };

