import { getAnalytics } from "../services/analytics.service.js";

export const getAllAnalytics = async (req, res, next) => {
    try {
        const analytics = await getAnalytics();
        res.json({ success: true, data: analytics });

    } catch (err) {
        next(err);
    }
};