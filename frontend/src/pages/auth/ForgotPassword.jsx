import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaArrowLeft,
} from "react-icons/fa";
import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!normalizedEmail) {
            setError(
                "Please enter your email address."
            );
            return;
        }

        try {
            setLoading(true);

            const data = await forgotPassword(
                normalizedEmail
            );

            setMessage(
                data.message ||
                    "OTP has been sent to your email."
            );

            // Store email as a fallback
            sessionStorage.setItem(
                "resetEmail",
                normalizedEmail
            );

            // Navigate to OTP verification page
            setTimeout(() => {
                navigate("/verify-otp", {
                    state: {
                        email: normalizedEmail,
                    },
                });
            }, 800);

        } catch (error) {
            console.error(
                "Forgot Password Error:",
                error
            );

            setError(
                error.message ||
                    "Unable to send OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    {/* Back to Login */}

                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
                    >
                        <FaArrowLeft />
                        Back to Login
                    </Link>


                    {/* Header */}

                    <div className="text-center mt-8">

                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FaEnvelope size={28} />
                        </div>

                        <h1 className="text-3xl font-bold text-slate-800 mt-6">
                            Forgot Password?
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Enter your registered email
                            and we'll send you a
                            6-digit OTP.
                        </p>

                    </div>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Email Address
                            </label>

                            <div className="relative">

                                <FaEnvelope
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    disabled={loading}
                                    className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-slate-100"
                                    required
                                />

                            </div>

                        </div>


                        {/* Error */}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                                {error}
                            </div>
                        )}


                        {/* Success */}

                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-3 text-sm">
                                {message}
                            </div>
                        )}


                        {/* Send OTP */}

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                !email.trim()
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
                        >
                            {loading
                                ? "Sending OTP..."
                                : "Send OTP"}
                        </button>

                    </form>


                    {/* Footer */}

                    <p className="text-center text-sm text-slate-500 mt-6">

                        Remember your password?{" "}

                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}
