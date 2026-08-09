import User from "../models/User.js";
import Order from "../models/Order.js";

export const getRiderEarnings = async (req, res) => {
    try {
        const riderId = req.user._id;

        // Get delivered orders of logged-in rider
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
                const day = new Date(
                    order.deliveredAt
                ).toLocaleDateString("en-IN", {
                    weekday: "long",
                });

                dailyEarnings[day] =
                    (dailyEarnings[day] || 0) + amount;
            }
        });

        const deliveries = orders.length;

        res.json({
            success: true,

            earnings: {
                total: totalEarnings,
                deliveries,
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

// Get all riders
export const getRiders = async (req, res) => {
    try {

        const riders = await User.find({
            role: "rider",
        })
        .select("-password")
        .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            count: riders.length,
            riders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

