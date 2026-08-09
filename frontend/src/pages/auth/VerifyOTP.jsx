import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../services/authService";

export default function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email) {
            setError(
                "Email information is missing. Please request a new OTP."
            );
            return;
        }

        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);

            const data = await verifyOTP(
                email,
                otp
            );

            setSuccess(
                data.message ||
                    "OTP verified successfully."
            );

            // Go to reset password page
            setTimeout(() => {
                navigate("/reset-password", {
                    state: {
                        email,
                    },
                });
            }, 800);

        } catch (error) {
            console.error(
                "OTP Verification Error:",
                error
            );

            setError(
                error.message ||
                    "Invalid or expired OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-slate-800">
                            Verify OTP
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Enter the OTP sent to your email.
                        </p>

                        {email && (
                            <p className="text-sm text-blue-600 mt-2 break-all">
                                {email}
                            </p>
                        )}

                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-5 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-3 mb-5 text-sm">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleVerify}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                placeholder="Enter 6-digit OTP"
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition"
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify OTP"}
                        </button>

                    </form>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/forgot-password")
                        }
                        className="w-full mt-5 text-blue-600 hover:underline text-sm"
                    >
                        Request a new OTP
                    </button>

                </div>

            </div>

        </div>
    );
}