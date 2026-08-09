import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowLeft,
} from "react-icons/fa";

import { resetPassword } from "../../services/authService";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from navigation state
    // or sessionStorage after refresh
    const email =
        location.state?.email ||
        sessionStorage.getItem("resetEmail");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email) {
            setError(
                "Email information is missing. Please start the password reset process again."
            );
            return;
        }

        if (!newPassword || !confirmPassword) {
            setError(
                "Please fill in both password fields."
            );
            return;
        }

        if (newPassword.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "Passwords do not match."
            );
            return;
        }

        try {
            setLoading(true);

            const data = await resetPassword(
                email,
                newPassword
            );

            console.log(
                "Password Reset:",
                data
            );

            setSuccess(
                data.message ||
                    "Password reset successfully."
            );

            // Remove temporary reset email
            sessionStorage.removeItem(
                "resetEmail"
            );

            // Go to login
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(
                "Reset Password Error:",
                error
            );

            setError(
                error.message ||
                    "Failed to reset password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    {/* Back */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/verify-otp")
                        }
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
                    >
                        <FaArrowLeft />
                        Back to OTP
                    </button>


                    {/* Header */}

                    <div className="text-center mt-8">

                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                            <FaLock size={28} />

                        </div>

                        <h1 className="text-3xl font-bold text-slate-800 mt-6">
                            Reset Password
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Create a new password for
                            your account.
                        </p>

                        {email && (
                            <p className="text-blue-600 text-sm font-medium mt-3 break-all">
                                {email}
                            </p>
                        )}

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mt-6">
                            {error}
                        </div>
                    )}


                    {/* Success */}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-3 text-sm mt-6">
                            {success}
                        </div>
                    )}


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-5"
                    >

                        {/* New Password */}

                        <div>

                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                New Password
                            </label>

                            <div className="relative">

                                <FaLock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="newPassword"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-slate-100"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Confirm Password */}

                        <div>

                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <FaLock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Confirm new password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-slate-100"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* Password requirement */}

                        <p className="text-xs text-slate-500">
                            Password must contain at least
                            6 characters.
                        </p>


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
                        >
                            {loading
                                ? "Resetting Password..."
                                : "Reset Password"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}
