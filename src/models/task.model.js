import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);