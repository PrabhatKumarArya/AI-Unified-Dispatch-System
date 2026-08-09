import User from "../models/User.js";
import Order from "../models/Order.js";

// ============================================
// GET RIDER EARNINGS
// ============================================
export const getRiderEarnings = async (req, res) => {
    try {
        const riderId = req.user._id;

        const orders = await Order.find({
            rider: riderId,
            orderStatus: "Delivered",
        }).sort({ deliveredAt: -1 });

        let totalEarnings = 0;
        const dailyEarnings = {};

        orders.forEach((order) => {
            const amount = Number(order.deliveryFee || 0);

            totalEarnings += amount;

            if (order.deliveredAt) {
                const date = new Date(order.deliveredAt);

                const day = date.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long",
                    }
                );

                dailyEarnings[day] =
                    (dailyEarnings[day] || 0) + amount;
            }
        });

        res.status(200).json({
            success: true,
            earnings: {
                total: totalEarnings,
                deliveries: orders.length,
                daily: dailyEarnings,
            },
        });

    } catch (error) {
        console.error(
            "Rider Earnings Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ============================================
// GET ALL RIDERS - ADMIN
// ============================================
export const getRiders = async (req, res) => {
    try {

        // Make sure only admin can access this
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        const riders = await User.find({
            role: "rider",
        })
            .select("-password")
            .sort({ createdAt: -1 });

        // Add delivery statistics for every rider
        const ridersWithStats = await Promise.all(
            riders.map(async (rider) => {

                const totalOrders =
                    await Order.countDocuments({
                        rider: rider._id,
                    });

                const deliveredOrders =
                    await Order.countDocuments({
                        rider: rider._id,
                        orderStatus: "Delivered",
                    });

                const activeOrders =
                    await Order.countDocuments({
                        rider: rider._id,
                        orderStatus: {
                            $in: [
                                "Assigned",
                                "Confirmed",
                                "Picked Up",
                                "Out for Delivery",
                            ],
                        },
                    });

                return {
                    _id: rider._id,
                    name: rider.name,
                    email: rider.email,
                    phone: rider.phone,
                    role: rider.role,
                    createdAt: rider.createdAt,

                    stats: {
                        totalOrders,
                        deliveredOrders,
                        activeOrders,
                    },
                };
            })
        );

        console.log(
            `Admin fetched ${ridersWithStats.length} riders`
        );

        res.status(200).json({
            success: true,
            count: ridersWithStats.length,
            riders: ridersWithStats,
        });

    } catch (error) {

        console.error(
            "Get Riders Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
