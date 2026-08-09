import { useState } from "react";

import {
    acceptOrder,
    pickUpOrder,
    outForDelivery,
    deliverOrder,
} from "../../services/riderService";


export default function AssignedOrders({
    orders = [],
    onRefresh,
}) {

    const [processing, setProcessing] =
        useState(null);

    const [error, setError] =
        useState("");


    const handleAction = async (
        action,
        orderId
    ) => {

        try {

            setProcessing(orderId);
            setError("");

            await action(orderId);

            await onRefresh();

        } catch (error) {

            console.error(error);

            setError(
                error.message
            );

        } finally {

            setProcessing(null);

        }
    };


    const getAction = (status) => {

        switch (status) {

            case "Assigned":
                return {
                    text: "Accept",
                    action: acceptOrder,
                };

            case "Confirmed":
                return {
                    text: "Pick Up",
                    action: pickUpOrder,
                };

            case "Picked Up":
                return {
                    text: "Out for Delivery",
                    action: outForDelivery,
                };

            case "Out for Delivery":
                return {
                    text: "Deliver",
                    action: deliverOrder,
                };

            default:
                return null;
        }
    };


    return (
        <div className="bg-white rounded-2xl shadow p-6">


            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold">
                        Assigned Orders
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Orders assigned to you.
                    </p>

                </div>

                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-semibold">
                    {orders.length}
                </span>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3">
                    {error}
                </div>

            )}


            {/* Empty */}

            {orders.length === 0 ? (

                <div className="border rounded-xl p-8 text-center">

                    <p className="text-slate-500">
                        No assigned orders.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {orders.map(
                        (order) => {

                            const action =
                                getAction(
                                    order.orderStatus
                                );

                            return (

                                <div
                                    key={
                                        order._id
                                    }
                                    className="border rounded-xl p-5 hover:bg-slate-50 transition"
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        <div>

                                            <h3 className="font-bold text-slate-800">
                                                Order #
                                                {order._id.slice(
                                                    -6
                                                )}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                Customer:{" "}
                                                {order.customer?.name ||
                                                    "Unknown"}
                                            </p>

                                        </div>


                                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                                            {
                                                order.orderStatus
                                            }
                                        </span>

                                    </div>


                                    <div className="mt-4 text-sm space-y-1">

                                        <p>
                                            <span className="font-medium">
                                                Service:
                                            </span>{" "}
                                            {
                                                order.serviceType
                                            }
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Pickup:
                                            </span>{" "}
                                            {
                                                order.pickupAddress
                                            }
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Delivery:
                                            </span>{" "}
                                            {
                                                order.deliveryAddress
                                            }
                                        </p>

                                    </div>


                                    {action && (

                                        <button
                                            disabled={
                                                processing ===
                                                order._id
                                            }
                                            onClick={() =>
                                                handleAction(
                                                    action.action,
                                                    order._id
                                                )
                                            }
                                            className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-5 py-2 rounded-xl font-medium transition"
                                        >

                                            {processing ===
                                            order._id
                                                ? "Processing..."
                                                : action.text}

                                        </button>

                                    )}

                                </div>

                            );
                        }
                    )}

                </div>

            )}

        </div>
    );
}