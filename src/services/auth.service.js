import bcrypt from "bcryptjs";
import redisClient from "../config/redis.config.js";
import { blockUser, incrementFailedLogin, isUserBlocked, resetFailedLogin } from "../helpers/auth.helper.js";
import User from "../models/user.model.js";

export const registerUser = async ({ fullName, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
    });

    return user;
};

export const loginUser = async ({ email, password }) => {
    const blocked = await isUserBlocked(email);
    if (blocked) throw new Error("Too many failed attempts. Try again after 15 minutes.");

    const user = await User.findOne({ email });
    if (!user) {
        const attempts = await incrementFailedLogin(email);
        if (attempts >= 5) await blockUser(email);
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const attempts = await incrementFailedLogin(email);
        if (attempts >= 5) await blockUser(email);
        throw new Error("Invalid credentials");
    }

    await resetFailedLogin(email);
    await redisClient.incr("analytics:total_logins");
    return user;
};

export const sessionInfo = (req, res) => {
    res.json({
        success: true,
        session: req.session.user || null,
    });
};
