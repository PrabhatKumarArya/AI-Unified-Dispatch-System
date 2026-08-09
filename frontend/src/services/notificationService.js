import API_URL from "./api";

const API = `${API_URL}/notifications`;

const getToken = () => {
    return localStorage.getItem("token");
};

// ===============================
// Get Notifications
// ===============================

export const getNotifications = async () => {
    const token = getToken();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const response = await fetch(API, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch notifications"
        );
    }

    return data;
};

// ===============================
// Mark Notification As Read
// ===============================

export const markNotificationRead = async (notificationId) => {
    const token = getToken();

    if (!token) {
        throw new Error("Authentication token not found");
    }

    const response = await fetch(
        `${API}/${notificationId}/read`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Failed to mark notification as read"
        );
    }

    return data;
};
