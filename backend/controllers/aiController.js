import Order from "../models/Order.js";

export const getAIRecommendations = async (req, res) => {
    try {
        // Get only the logged-in customer's orders
        const orders = await Order.find({
            customer: req.user._id,
        })
            .populate("rider", "name email")
            .sort({ createdAt: -1 });

        const recommendations = [];

        /*
         * 1. Active order recommendation
         */
        const activeOrder = orders.find((order) =>
            [
                "Pending",
                "Confirmed",
                "Assigned",
                "Picked Up",
                "Out for Delivery",
            ].includes(order.orderStatus)
        );

        if (activeOrder) {
            recommendations.push({
                title: "Track Your Active Order",
                description: `Your ${activeOrder.serviceType} order is currently ${activeOrder.orderStatus}.`,
            });
        }

        /*
         * 2. Delivery time recommendation
         */
        if (activeOrder && activeOrder.estimatedTime > 0) {
            recommendations.push({
                title: "Estimated Delivery Time",
                description: `Your current order is estimated to arrive in ${activeOrder.estimatedTime} minutes.`,
            });
        }

        /*
         * 3. Rider assignment recommendation
         */
        if (
            activeOrder &&
            activeOrder.orderStatus === "Pending"
        ) {
            recommendations.push({
                title: "Rider Assignment",
                description:
                    "Your order is waiting for a rider. The dispatch system will assign the most suitable available rider.",
            });
        }

        /*
         * 4. Distance recommendation
         */
        if (
            activeOrder &&
            activeOrder.distance > 0
        ) {
            recommendations.push({
                title: "Delivery Route",
                description: `Your delivery distance is approximately ${activeOrder.distance} km.`,
            });
        }

        /*
         * No recommendations
         */
        if (recommendations.length === 0) {
            recommendations.push({
                title: "Everything Looks Good",
                description:
                    "You currently have no active delivery recommendations.",
            });
        }

        res.json({
            success: true,
            count: recommendations.length,
            recommendations,
        });
    } catch (error) {
        console.error(
            "AI Recommendation Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};