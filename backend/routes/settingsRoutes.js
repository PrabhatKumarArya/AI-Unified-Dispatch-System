import express from "express";

import {
    getSettings,
    updateSettings,
} from "../controllers/settingsController.js";

import {
    protect,
    authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only
router.get(
    "/",
    protect,
    authorize("admin"),
    getSettings
);

router.put(
    "/",
    protect,
    authorize("admin"),
    updateSettings
);

export default router;