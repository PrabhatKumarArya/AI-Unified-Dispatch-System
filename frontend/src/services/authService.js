const API = "http://localhost:5000/api/auth";


// =========================
// Register User
// =========================

export const registerUser = async (userData) => {

    const response = await fetch(`${API}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    });


    const data = await response.json();


    if (!response.ok) {
        throw new Error(
            data.message || "Registration failed"
        );
    }


    return data;
};


// =========================
// Login User
// =========================

export const loginUser = async (userData) => {

    const response = await fetch(`${API}/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    });


    const data = await response.json();


    if (!response.ok) {
        throw new Error(
            data.message || "Login failed"
        );
    }


    return data;
};


// =========================
// Get Current Logged-in User
// =========================

export const getCurrentUser = async () => {

    const token = localStorage.getItem("token");


    if (!token) {
        throw new Error("Authentication token not found");
    }


    const response = await fetch(`${API}/me`, {
        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    const data = await response.json();


    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch current user"
        );
    }


    return data.user;
};

// ==========================================
// Send OTP
// ==========================================

export const forgotPassword = async (
    email
) => {

    const response = await fetch(
        `${API}/forgot-password`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                email,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to send OTP"
        );
    }

    return data;
};


// ==========================================
// Verify OTP
// ==========================================

export const verifyOTP = async (
    email,
    otp
) => {

    const response = await fetch(
        `${API}/verify-otp`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                email,
                otp,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Invalid OTP"
        );
    }

    return data;
};


// ==========================================
// Reset Password
// ==========================================

export const resetPassword = async (
    email,
    newPassword
) => {

    const response = await fetch(
        `${API}/reset-password`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                email,
                newPassword,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to reset password"
        );
    }

    return data;
};
