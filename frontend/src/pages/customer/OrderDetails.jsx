import {
  FaBox,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaClock,
} from "react-icons/fa";

export default function OrderDetails() {
  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold">
        Order Details
      </h1>

      <p className="text-slate-500 mt-2">
        Complete information about your order.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Order Information
          </h2>

          <p><strong>Order ID:</strong> #1024</p>
          <p className="mt-3"><strong>Service:</strong> Food Delivery</p>
          <p className="mt-3"><strong>Status:</strong> In Transit</p>
          <p className="mt-3"><strong>ETA:</strong> 18 Minutes</p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Delivery Address
          </h2>

          <p>IIIT Bhopal Hostel</p>

          <div className="mt-6 h-56 rounded-xl border-2 border-dashed flex items-center justify-center">
            🗺️ Live Map (Coming Soon)
          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6 mt-8">

        <h2 className="text-xl font-bold mb-6">
          Delivery Timeline
        </h2>

        <div className="space-y-5">

          <div className="flex gap-4">
            <FaBox className="text-green-600 mt-1"/>
            <p>Order Confirmed</p>
          </div>

          <div className="flex gap-4">
            <FaMapMarkerAlt className="text-blue-600 mt-1"/>
            <p>Pickup Completed</p>
          </div>

          <div className="flex gap-4">
            <FaMotorcycle className="text-orange-500 mt-1"/>
            <p>Out for Delivery</p>
          </div>

          <div className="flex gap-4">
            <FaClock className="text-slate-500 mt-1"/>
            <p>Estimated Arrival: 18 Minutes</p>
          </div>

        </div>

      </div>

    </div>
  );
}