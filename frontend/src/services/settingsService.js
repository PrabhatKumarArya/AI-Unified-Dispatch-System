import API_URL from "./api"; 
const API = `${API_URL}/settings`;

const getToken = () => {
    return localStorage.getItem("token");
};

export const getSettings = async () => {
    const response = await fetch(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch settings"
        );
    }

    return data;
};

export const updateSettings = async (settings) => {
    const response = await fetch(API, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(settings),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update settings"
        );
    }

    return data;
};