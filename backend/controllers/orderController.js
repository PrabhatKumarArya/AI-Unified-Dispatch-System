import Order from "../models/Order.js";
import User from "../models/User.js";
import createNotification from "../utils/createNotification.js";

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

        // Notify customer
        await createNotification({
            recipient: req.user._id,
            title: "Order Created",
            message: `Your ${serviceType} order has been created successfully.`,
            type: "order",
            order: order._id,
        });

        // Notify admins
        await createNotification({
            recipientRole: "admin",
            title: "New Order Received",
            message: `A new ${serviceType} order has been created.`,
            type: "order",
            order: order._id,
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

        // Rider notification
        await createNotification({
            recipient: rider._id,
            title: "New Order Assigned",
            message: `Order #${order._id} has been assigned to you.`,
            type: "assignment",
            order: order._id,
        });

        // Customer notification
        await createNotification({
            recipient: order.customer,
            title: "Rider Assigned",
            message: `${rider.name} has been assigned to your order.`,
            type: "assignment",
            order: order._id,
        });

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

        const order = await Order.findById(req.params.id)
            .populate("customer", "name email")
            .populate("rider", "name email");

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

        // Notify customer
        await createNotification({
            recipient: order.customer._id,
            recipientRole: "customer",
            title: `Order ${orderStatus}`,
            message: `Your order is now ${orderStatus}.`,
            type: "delivery",
            order: order._id,
        });

        // Notify rider if assigned
        if (order.rider) {
            await createNotification({
                recipient: order.rider._id,
                recipientRole: "rider",
                title: `Order ${orderStatus}`,
                message: `Order #${order._id} status changed to ${orderStatus}.`,
                type: "delivery",
                order: order._id,
            });
        }

        // Notify admins
        await createNotification({
            recipientRole: "admin",
            title: `Order ${orderStatus}`,
            message: `Order #${order._id} is now ${orderStatus}.`,
            type: "order",
            order: order._id,
        });

        res.json({
            success: true,
            message: "Order status updated",
            order,
        });

    } catch (error) {
        console.error("Update order status error:", error);

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

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            !order.rider ||
            order.rider.toString() !==
                req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "This order is not assigned to you",
            });
        }

        order.orderStatus = "Confirmed";

        order.tracking.push({
            status: "Confirmed",
            message: "Rider accepted the order",
            time: new Date(),
        });

        await order.save();

        await createNotification({
            recipient: order.customer,
            recipientRole: "customer",
            title: "Order Confirmed",
            message: "Your rider has accepted the order.",
            type: "order",
            order: order._id,
        });

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

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            !order.rider ||
            order.rider.toString() !==
                req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "This order is not assigned to you",
            });
        }

        order.orderStatus = "Picked Up";
        order.pickedUpAt = new Date();

        order.tracking.push({
            status: "Picked Up",
            message: "Package picked up",
            time: new Date(),
        });

        await order.save();

        await createNotification({
            userId: order.customer,
            title: "Order Picked Up",
            message: "Your order has been picked up by the rider.",
            type: "delivery",
            orderId: order._id,
        });

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

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            !order.rider ||
            order.rider.toString() !==
                req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "This order is not assigned to you",
            });
        }

        order.orderStatus = "Out for Delivery";

        order.tracking.push({
            status: "Out for Delivery",
            message: "Rider is on the way",
            time: new Date(),
        });

        await order.save();

        await createNotification({
            userId: order.customer,
            title: "Order Out for Delivery",
            message: "Your order is on the way.",
            type: "delivery",
            orderId: order._id,
        });

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

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            !order.rider ||
            order.rider.toString() !==
                req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "This order is not assigned to you",
            });
        }

        order.orderStatus = "Delivered";
        order.deliveredAt = new Date();
        order.paymentStatus = "Paid";

        order.tracking.push({
            status: "Delivered",
            message: "Order delivered successfully",
            time: new Date(),
        });

        await order.save();

        await createNotification({
            userId: order.customer,
            title: "Order Delivered 🎉",
            message: "Your order has been delivered successfully.",
            type: "delivery",
            orderId: order._id,
        });

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

// Get Rider Earnings
export const getRiderEarnings = async (req, res) => {
    try {
        // Only riders can access their earnings
        if (req.user.role !== "rider") {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        const orders = await Order.find({
            rider: req.user._id,
            orderStatus: "Delivered",
        }).sort({
            deliveredAt: -1,
        });

        const totalEarnings = orders.reduce(
            (total, order) =>
                total + Number(order.deliveryFee || 0),
            0
        );

        const totalDeliveries = orders.length;

        // Calculate earnings for the last 7 days
        const today = new Date();

        const weeklyEarnings = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() - i);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const dayOrders = orders.filter((order) => {
                if (!order.deliveredAt) return false;

                const deliveredDate = new Date(
                    order.deliveredAt
                );

                return (
                    deliveredDate >= date &&
                    deliveredDate < nextDate
                );
            });

            const amount = dayOrders.reduce(
                (total, order) =>
                    total + Number(order.deliveryFee || 0),
                0
            );

            weeklyEarnings.push({
                day: date.toLocaleDateString("en-IN", {
                    weekday: "long",
                }),
                date: date.toISOString().split("T")[0],
                amount,
                deliveries: dayOrders.length,
            });
        }

        // Calculate today's earnings
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const todayOrders = orders.filter((order) => {
            if (!order.deliveredAt) return false;

            return (
                new Date(order.deliveredAt) >= startOfDay
            );
        });

        const todayEarnings = todayOrders.reduce(
            (total, order) =>
                total + Number(order.deliveryFee || 0),
            0
        );

        res.json({
            success: true,
            earnings: {
                total: totalEarnings,
                today: todayEarnings,
                deliveries: totalDeliveries,
                weekly: weeklyEarnings,
            },
        });
    } catch (error) {
        console.error(
            "Get rider earnings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};