import { loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        user.password = null;
        return res.status(201).json({ success: true, message: "User registered successfully", data: user });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await loginUser(req.body);

        const sessionExpiry =
            Number(process.env.SESSION_EXPIRY) ||
            1000 * 60 * 60; // 1 huor

        req.session.user = {
            id: user._id,
            loginTime: new Date(),
            sessionExpiry: new Date(
                Date.now() + sessionExpiry
            ),
        };

        return res.status(200).json({
            success: true, message: "Login successful",
            data: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie("connect.sid");

            return res.status(200).json({
                success: true,
                message: "Logout successful",
            });
        });
    } catch (err) {
        next(err);
    }
};