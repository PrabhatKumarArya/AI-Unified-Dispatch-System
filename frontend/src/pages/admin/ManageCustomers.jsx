import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customerService";

export default function ManageCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        try {
            setLoading(true);
            setError("");

            const data = await getCustomers();

            console.log("Customers API response:", data);

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch customers"
                );
            }

            setCustomers(
                Array.isArray(data.customers)
                    ? data.customers
                    : []
            );

        } catch (error) {
            console.error(
                "Customers Fetch Error:",
                error
            );

            setError(
                error.message ||
                "Failed to fetch customers"
            );

        } finally {
            setLoading(false);
        }
    }

    // Loading
    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-6">

                <h1 className="text-3xl font-bold">
                    Customers
                </h1>

                <p className="mt-4 text-slate-500">
                    Loading customers...
                </p>

            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow p-6">

                <div className="flex items-center justify-between">

                    <h1 className="text-3xl font-bold">
                        Customers
                    </h1>

                    <button
                        onClick={fetchCustomers}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>

                </div>

                <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4">

                    <p className="text-red-600">
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Customers
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage registered customers.
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-xl font-semibold">
                        {customers.length} Customers
                    </span>

                    <button
                        onClick={fetchCustomers}
                        className="border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-50 transition"
                    >
                        Refresh
                    </button>

                </div>

            </div>


            {/* No Customers */}
            {customers.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-8 text-center">

                    <p className="text-slate-500">
                        No customers registered yet.
                    </p>

                </div>

            ) : (

                /* Customer Cards */
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {customers.map((customer) => (

                        <div
                            key={customer._id}
                            className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
                        >

                            <h2 className="text-xl font-semibold text-slate-800">
                                {customer.name}
                            </h2>

                            <p className="text-slate-500 mt-2">
                                {customer.email}
                            </p>

                            <p className="text-slate-500 mt-1">
                                {customer.phone || "Phone not provided"}
                            </p>

                            <div className="mt-4">

                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                                    {customer.role}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}