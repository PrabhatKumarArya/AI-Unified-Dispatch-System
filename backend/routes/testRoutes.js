import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/customer",
  protect,
  authorize("customer"),
  (req, res) => {
    res.json({
      message: "Welcome Customer",
      user: req.user,
    });
  }
);

router.get(
  "/rider",
  protect,
  authorize("rider"),
  (req, res) => {
    res.json({
      message: "Welcome Rider",
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

export default router;