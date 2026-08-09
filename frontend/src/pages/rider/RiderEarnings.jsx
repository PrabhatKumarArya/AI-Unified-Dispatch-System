import { useEffect, useState } from "react";
import {
    FaSpinner,
    FaExclamationTriangle,
    FaSyncAlt,
} from "react-icons/fa";

import {
    getRiderEarnings,
} from "../../services/riderService";

export default function RiderEarnings() {
    const [earnings, setEarnings] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        fetchEarnings();
    }, []);

    async function fetchEarnings(
        isRefresh = false
    ) {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data =
                await getRiderEarnings();

            console.log(
                "Rider Earnings:",
                data
            );

            setEarnings(
                data.earnings || {
                    total: 0,
                    deliveries: 0,
                    daily: {},
                }
            );
        } catch (error) {
            console.error(
                "Earnings Fetch Error:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const formatCurrency = (amount) => {
        return `₹${Number(amount || 0).toLocaleString(
            "en-IN"
        )}`;
    };

    const dailyEarnings =
        earnings?.daily || {};

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center justify-center">

                <FaSpinner
                    className="text-blue-600 animate-spin"
                    size={35}
                />

                <p className="text-slate-500 mt-4">
                    Loading earnings...
                </p>

            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow p-8">

                <div className="flex flex-col items-center text-center">

                    <FaExclamationTriangle
                        className="text-red-500"
                        size={40}
                    />

                    <p className="text-red-600 mt-4">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            fetchEarnings(true)
                        }
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div>

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Earnings
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Track your delivery earnings.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        fetchEarnings(true)
                    }
                    disabled={refreshing}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-60 transition"
                >

                    <FaSyncAlt
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}

                </button>

            </div>


            {/* Statistics */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                {/* Total Earnings */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-slate-500">
                        Total Earnings
                    </p>

                    <h2 className="text-4xl font-bold text-green-600 mt-2">
                        {formatCurrency(
                            earnings?.total
                        )}
                    </h2>

                </div>


                {/* Deliveries */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-slate-500">
                        Deliveries
                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-2">
                        {earnings?.deliveries ||
                            0}
                    </h2>

                </div>


                {/* Rating */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-slate-500">
                        Rating
                    </p>

                    <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                        ⭐4.9
                    </h2>

                </div>

            </div>


            {/* Weekly Earnings */}

            <div className="bg-white rounded-2xl shadow p-6 mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Weekly Earnings
                </h2>

                {days.map((day) => (

                    <div
                        key={day}
                        className="flex justify-between py-3 border-b last:border-b-0"
                    >

                        <span className="text-slate-600">
                            {day}
                        </span>

                        <span className="font-bold text-slate-800">
                            {formatCurrency(
                                dailyEarnings[
                                    day
                                ] || 0
                            )}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}
