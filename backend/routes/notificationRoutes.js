import express from "express";

import {
    getNotifications,
    markNotificationRead,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get logged-in user's notifications
router.get("/", protect, getNotifications);


// Mark notification as read
router.put(
    "/:id/read",
    protect,
    markNotificationRead
);

export default router;