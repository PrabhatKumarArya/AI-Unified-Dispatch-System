import express from "express";

import {
    getAIRecommendations,
} from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get AI recommendations for logged-in customer
router.get(
    "/recommendations",
    protect,
    getAIRecommendations
);

export default router;