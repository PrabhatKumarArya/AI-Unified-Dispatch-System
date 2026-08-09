const API = "http://localhost:5000/api/orders";
const RIDER_API = "http://localhost:5000/api/riders";

const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error( "Authentication token not found. Please login again." ); 
    }
    return token;
};

const getHeaders = () => ({ 
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
});

export const getRiders = async () => {
    const response = await fetch( RIDER_API,
         { method: "GET", headers: getHeaders(), cache: "no-store", } );
    const data = await response.json(); 
    console.log( "Riders API response:", data );
    if (!response.ok) { throw new Error( data.message || "Failed to fetch riders" ); }
    return data;
};

// Get rider's assigned orders
export const getRiderOrders = async () => {

    const response = await fetch( API,
        { method: "GET", headers: getHeaders(), cache: "no-store", }
    ); 
    const data = await response.json();
    if (!response.ok) { throw new Error( data.message || "Failed to fetch rider orders" ); } 
    return data;
};


// Accept order
export const acceptOrder = async (orderId) => {

    const response = await fetch(
        `${API}/${orderId}/accept`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to accept order"
        );
    }

    return data;
};

export const getRiderEarnings = async () => {
    const response = await fetch(
        `${API}/earnings`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },

            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(
            data.message ||
                "Failed to fetch earnings"
        );
    }

    return data;
};

// Pick up order
export const pickUpOrder = async (orderId) => {

    const response = await fetch(
        `${API}/${orderId}/pickup`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to pick up order"
        );
    }

    return data;
};


// Out for delivery
export const outForDelivery = async (
    orderId
) => {

    const response = await fetch(
        `${API}/${orderId}/out-for-delivery`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
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


// Deliver order
export const deliverOrder = async (orderId) => {

    const response = await fetch(
        `${API}/${orderId}/deliver`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to deliver order"
        );
    }

    return data;
};