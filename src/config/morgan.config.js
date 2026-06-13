import fs from "fs";
import morgan from "morgan";
import path from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logStream = fs.createWriteStream(
    path.join(logDir, "access.log"),
    { flags: "a" }
);

export const consoleLogger = morgan("dev");

export const fileLogger = morgan("combined", {
    stream: logStream,
});

export const errorLogger = morgan("combined", {
    skip: (req, res) => res.statusCode <= 500,
    stream: logStream,
});