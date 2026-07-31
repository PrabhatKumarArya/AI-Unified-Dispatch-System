import Order from "../models/Order.js";
import User from "../models/User.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      serviceType,
      pickupAddress,
      deliveryAddress,
      pickupLocation,
      deliveryLocation,
      deliveryFee,
      estimatedTime,
      notes,
    } = req.body;

    const order = await Order.create({
      customer: req.user._id,
      serviceType,
      pickupAddress,
      deliveryAddress,
      pickupLocation,
      deliveryLocation,
      deliveryFee,
      estimatedTime,
      notes,
      tracking: [
        {
          status: "Pending",
          message: "Order Created",
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Orders
export const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("customer", "name email")
        .populate("rider", "name email")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "rider") {
      orders = await Order.find({ rider: req.user._id })
        .populate("customer", "name email")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ customer: req.user._id })
        .populate("rider", "name email")
        .sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("rider", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignRider = async (req, res) => {
  try {
    const { riderId } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const rider = await User.findById(riderId);

    if (!rider || rider.role !== "rider") {
      return res.status(400).json({
        success: false,
        message: "Invalid Rider",
      });
    }

    order.rider = rider._id;
    order.orderStatus = "Assigned";
    order.assignedAt = new Date();

    order.tracking.push({
      status: "Assigned",
      message: `Assigned to ${rider.name}`,
      time: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Rider assigned successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    switch (orderStatus) {
      case "Picked Up":
        order.pickedUpAt = new Date();
        break;

      case "Delivered":
        order.deliveredAt = new Date();
        order.paymentStatus = "Paid";
        break;
    }

    order.tracking.push({
      status: orderStatus,
      message: `Order ${orderStatus}`,
      time: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    if (order.rider.toString() !== req.user._id.toString())
      return res.status(403).json({
        success: false,
        message: "This order is not assigned to you",
      });

    order.orderStatus = "Confirmed";

    order.tracking.push({
      status: "Confirmed",
      message: "Rider accepted the order",
      time: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Order accepted",
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const pickUpOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    order.orderStatus = "Picked Up";
    order.pickedUpAt = new Date();

    order.tracking.push({
      status: "Picked Up",
      message: "Package picked up",
      time: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Order picked up",
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const outForDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    order.orderStatus = "Out for Delivery";

    order.tracking.push({
      status: "Out for Delivery",
      message: "Rider is on the way",
      time: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Order is out for delivery",
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deliverOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    order.orderStatus = "Delivered";
    order.deliveredAt = new Date();
    order.paymentStatus = "Paid";

    order.tracking.push({
      status: "Delivered",
      message: "Order delivered successfully",
      time: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Order delivered",
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
