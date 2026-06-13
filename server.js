import app from "./app.js";
import connectDB from "./src/config/db.config.js";
import env from "./src/config/env.config.js";

const startServer = async () => {
    try {
        await connectDB();

        const PORT = env.PORT || 5050;
        const NODE_ENV = env.NODE_ENV;

        app.listen(PORT, () => {
            console.log(
                `Server running on PORT ${PORT} on ${NODE_ENV} environment.`
            );
        });
    } catch (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
};

startServer();