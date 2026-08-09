export default function RiderStatCard({
    title,
    value,
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-slate-500 text-sm">
                {title}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-3">
                {value}
            </h2>

        </div>
    );
}