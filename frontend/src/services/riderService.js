import API_URL from "./api";

const API = `${API_URL}/orders`;
const RIDER_API = `${API_URL}/riders`;

// ===============================
// Authentication
// ===============================

const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Authentication token not found. Please login again."
        );
    }

    return token;
};

const getHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
});

// ===============================
// Get All Riders
// ===============================

export const getRiders = async () => {
    const response = await fetch(RIDER_API, {
        method: "GET",
        headers: getHeaders(),
        cache: "no-store",
    });

    const data = await response.json();

    console.log("Riders API response:", data);

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch riders"
        );
    }

    return data;
};

// ===============================
// Get Rider's Assigned Orders
// ===============================

export const getRiderOrders = async () => {
    const response = await fetch(API, {
        method: "GET",
        headers: getHeaders(),
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch rider orders"
        );
    }

    return data;
};

// ===============================
// Accept Order
// ===============================

export const acceptOrder = async (orderId) => {
    const response = await fetch(
        `${API}/${orderId}/accept`,
        {
            method: "PUT",
            headers: getHeaders(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to accept order"
        );
    }

    return data;
};

// ===============================
// Get Rider Earnings
// ===============================

export const getRiderEarnings = async () => {
    const response = await fetch(
        `${API}/earnings`,
        {
            method: "GET",
            headers: getHeaders(),
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(
            data.message || "Failed to fetch earnings"
        );
    }

    return data;
};

// ===============================
// Pick Up Order
// ===============================

export const pickUpOrder = async (orderId) => {
    const response = await fetch(
        `${API}/${orderId}/pickup`,
        {
            method: "PUT",
            headers: getHeaders(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to pick up order"
        );
    }

    return data;
};

// ===============================
// Out For Delivery
// ===============================

export const outForDelivery = async (orderId) => {
    const response = await fetch(
        `${API}/${orderId}/out-for-delivery`,
        {
            method: "PUT",
            headers: getHeaders(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Failed to update delivery status"
        );
    }

    return data;
};

// ===============================
// Deliver Order
// ===============================

export const deliverOrder = async (orderId) => {
    const response = await fetch(
        `${API}/${orderId}/deliver`,
        {
            method: "PUT",
            headers: getHeaders(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to deliver order"
        );
    }

    return data;
};
