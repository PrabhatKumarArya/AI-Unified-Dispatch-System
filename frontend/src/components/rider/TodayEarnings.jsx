export default function TodayEarnings({
    orders = [],
    earnings = 0,
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold">
                Today's Earnings
            </h2>

            <p className="text-slate-500 mt-1">
                Earnings from completed deliveries.
            </p>

            <div className="mt-8">

                <p className="text-4xl font-bold text-green-600">
                    ₹{earnings}
                </p>

                <p className="text-slate-500 mt-2">
                    {orders.length} completed deliveries
                </p>

            </div>

        </div>
    );
}