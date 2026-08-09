import express from "express";

import { getCustomers } from "../controllers/customerController.js";

import {
    protect,
    authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admin can view customers
router.get(
    "/",
    protect,
    authorize("admin"),
    getCustomers
);

export default router;