export default function RoutePreview({
    order,
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
                Current Route
            </h2>

            {!order ? (

                <div className="border rounded-xl p-8 text-center">

                    <p className="text-slate-500">
                        No active delivery route.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    <div className="bg-blue-50 rounded-xl p-5">

                        <p className="text-sm text-slate-500">
                            Pickup
                        </p>

                        <p className="font-semibold mt-1">
                            {order.pickupAddress}
                        </p>

                    </div>


                    <div className="flex justify-center text-slate-400">
                        ↓
                    </div>


                    <div className="bg-green-50 rounded-xl p-5">

                        <p className="text-sm text-slate-500">
                            Delivery
                        </p>

                        <p className="font-semibold mt-1">
                            {order.deliveryAddress}
                        </p>

                    </div>

                </div>

            )}

        </div>
    );
}