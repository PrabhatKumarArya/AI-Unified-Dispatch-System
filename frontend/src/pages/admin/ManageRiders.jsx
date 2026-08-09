import { useEffect, useState } from "react";
import { getRiders } from "../../services/riderService";

export default function ManageRiders() {
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRiders();
    }, []);

    async function fetchRiders() {
        try {
            setLoading(true);
            setError("");

            const data = await getRiders();

            console.log("Riders API response:", data);

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch riders"
                );
            }

            setRiders(
                Array.isArray(data.riders)
                    ? data.riders
                    : []
            );
        } catch (error) {
            console.error("Riders Fetch Error:", error);

            setError(
                error.message || "Failed to fetch riders"
            );
        } finally {
            setLoading(false);
        }
    }

    // Loading
    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold text-slate-800">
                    Manage Riders
                </h1>

                <p className="mt-4 text-slate-500">
                    Loading riders...
                </p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Manage Riders
                    </h1>

                    <button
                        onClick={fetchRiders}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Refresh
                    </button>
                </div>

                <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 font-medium">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Manage Riders
                    </h1>

                    <p className="text-slate-500 mt-1">
                        View and manage registered delivery riders.
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-semibold">
                        {riders.length} Riders
                    </span>

                    <button
                        onClick={fetchRiders}
                        className="border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-50 transition"
                    >
                        Refresh
                    </button>

                </div>
            </div>

            {/* No Riders */}
            {riders.length === 0 ? (
                <div className="border rounded-xl p-8 text-center">

                    <p className="text-slate-500">
                        No riders registered yet.
                    </p>

                </div>
            ) : (

                /* Riders Table */
                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>
                                <th className="p-4 text-left">
                                    Rider
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                                <th className="p-4 text-left">
                                    Role
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {riders.map((rider) => (

                                <tr
                                    key={rider._id}
                                    className="border-t hover:bg-slate-50 transition"
                                >

                                    {/* Name */}
                                    <td className="p-4">
                                        <div className="font-semibold text-slate-800">
                                            {rider.name || "Unknown Rider"}
                                        </div>

                                        <div className="text-xs text-slate-400 mt-1">
                                            ID: {rider._id}
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="p-4 text-slate-600">
                                        {rider.email || "Not provided"}
                                    </td>

                                    {/* Phone */}
                                    <td className="p-4 text-slate-600">
                                        {rider.phone || "Not provided"}
                                    </td>

                                    {/* Role */}
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                                            {rider.role || "rider"}
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}