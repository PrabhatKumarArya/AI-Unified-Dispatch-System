import express from "express";

import {
    getRiders,getRiderEarnings,
} from "../controllers/riderController.js";


import {
    protect,
    authorize,
} from "../middleware/authMiddleware.js";


const router = express.Router();


router.get(
    "/",
    protect,
    authorize("admin"),
    getRiders
);

router.get(
    "/earnings",
    protect,
    getRiderEarnings
);

export default router;