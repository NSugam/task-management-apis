import { connect } from "mongoose";
import env from "./env.config.js";

const connectDB = async () => {
    try {
        await connect(env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

export default connectDB;