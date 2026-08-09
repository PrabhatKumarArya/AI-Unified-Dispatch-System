import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  assignRider,
  updateOrderStatus,
  deleteOrder,
  acceptOrder,
  pickUpOrder,
  outForDelivery,
  deliverOrder,
  getRiderEarnings,
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer/Admin/Rider
router.post("/", protect, authorize("customer"), createOrder);

router.get("/", protect, getOrders);

router.get("/earnings", protect, getRiderEarnings);

router.get("/:id", protect, getOrderById);



// Assign Rider
router.put(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignRider
);


// Only Admin can update status
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatus
);

// Customer/Admin can delete
router.delete(
  "/:id",
  protect,
  deleteOrder
);

// Rider Routes
router.put(
  "/:id/accept",
  protect,
  authorize("rider"),
  acceptOrder
);

router.put(
  "/:id/pickup",
  protect,
  authorize("rider"),
  pickUpOrder
);

router.put(
  "/:id/out-for-delivery",
  protect,
  authorize("rider"),
  outForDelivery
);

router.put(
  "/:id/deliver",
  protect,
  authorize("rider"),
  deliverOrder
);

router.get("/:id", protect, getOrderById);

export default router;