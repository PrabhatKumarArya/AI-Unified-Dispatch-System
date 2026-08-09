import API_URL from "./api"; 
const API = `${API_URL}/customers`;

const getToken = () => {
    return localStorage.getItem("token");
};

export const getCustomers = async () => {
    const token = getToken();

    if (!token) {
        throw new Error("Authentication required. Please login again.");
    }

    const response = await fetch(API, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch customers"
        );
    }

    return data;
};