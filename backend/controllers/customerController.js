import User from "../models/User.js";

// Get all customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({
            role: "customer",
        })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: customers.length,
            customers,
        });
    } catch (error) {
        console.error("Get Customers Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};