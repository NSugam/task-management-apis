import app from "./app.js";
import connectDB from "./src/config/db.config.js";
import env from "./src/config/env.config.js";

connectDB();

const PORT = env.PORT || 5050;
const NODE_ENV = env.NODE_ENV;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} on ${NODE_ENV} environment.`);
});