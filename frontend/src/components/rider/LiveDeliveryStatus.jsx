export default function LiveDeliveryStatus({
    order,
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
                Live Delivery Status
            </h2>

            {!order ? (

                <div className="border rounded-xl p-6 text-center">

                    <p className="text-slate-500">
                        No active delivery.
                    </p>

                </div>

            ) : (

                <div>

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">
                                Order
                            </p>

                            <h3 className="font-bold">
                                #{order._id.slice(-6)}
                            </h3>

                        </div>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium">
                            {order.orderStatus}
                        </span>

                    </div>


                    <div className="mt-6">

                        <p className="text-sm text-slate-500">
                            Latest Update
                        </p>

                        <p className="font-medium mt-1">
                            {order.tracking?.[
                                order.tracking.length - 1
                            ]?.message ||
                                "No tracking information"}
                        </p>

                    </div>

                </div>

            )}

        </div>
    );
}