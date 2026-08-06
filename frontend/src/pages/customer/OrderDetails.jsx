import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMotorcycle, FaMapMarkerAlt, FaStore, FaClock, FaCheckCircle } from "react-icons/fa";
import { STATUS_COLORS } from "../../utils/constants";
import { shortOrderId, formatDate, formatCurrency } from "../../utils/helpers";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setOrder(data.order || null))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="skeleton h-10 rounded-xl mb-4 w-48" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  // Mock order for demo when backend isn't running
  const display = order || {
    _id: id,
    serviceType: "Food",
    orderStatus: "Out for Delivery",
    pickupAddress: "123 Main St, Bhopal",
    deliveryAddress: "456 Park Ave, Bhopal",
    deliveryFee: 80,
    estimatedTime: 18,
    notes: "Please ring the bell.",
    createdAt: new Date(),
    rider: { name: "Rahul Sharma", rating: 4.9 },
  };

  const steps = ["Pending", "Accepted", "Picked Up", "Out for Delivery", "Delivered"];
  const currentStepIdx = steps.indexOf(display.orderStatus);

  return (
    <div className="mt-8 max-w-3xl mx-auto space-y-6 page-enter">
      {/* Back */}
      <button
        onClick={() => navigate("/customer/orders")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition"
      >
        <FaArrowLeft size={13} /> Back to Orders
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{shortOrderId(display._id)}</h1>
            <p className="text-slate-500 text-sm mt-1">{formatDate(display.createdAt)}</p>
          </div>
          <span className={`badge text-sm px-4 py-1.5 ${STATUS_COLORS[display.orderStatus] || "bg-slate-100 text-slate-600"}`}>
            {display.orderStatus}
          </span>
        </div>

        {/* Progress tracker */}
        <div className="mt-8 relative">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100" />
          <div
            className="absolute top-4 left-4 h-0.5 bg-blue-500 transition-all duration-700"
            style={{ width: `${Math.max(0, currentStepIdx / (steps.length - 1)) * 90}%` }}
          />
          <div className="relative flex justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs z-10 ${
                  i < currentStepIdx ? "bg-blue-600 text-white" :
                  i === currentStepIdx ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-white border-2 border-slate-200 text-slate-400"
                }`}>
                  {i < currentStepIdx ? <FaCheckCircle size={12} /> : i + 1}
                </div>
                <p className={`text-xs font-medium text-center hidden sm:block ${
                  i <= currentStepIdx ? "text-blue-600" : "text-slate-400"
                }`}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-5">
          <h2 className="font-bold text-slate-800">Order Details</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <FaStore className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-xs">Service Type</p>
                <p className="font-semibold text-slate-700 mt-0.5">{display.serviceType}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-xs">Pickup Address</p>
                <p className="font-semibold text-slate-700 mt-0.5">{display.pickupAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-xs">Delivery Address</p>
                <p className="font-semibold text-slate-700 mt-0.5">{display.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaClock className="text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-xs">Estimated Time</p>
                <p className="font-semibold text-slate-700 mt-0.5">{display.estimatedTime} min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment + Rider */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
            <h2 className="font-bold text-slate-800 mb-4">Payment</h2>
            <div className="flex justify-between text-sm py-2 border-b border-slate-100">
              <span className="text-slate-500">Delivery Fee</span>
              <span className="font-semibold">{formatCurrency(display.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm py-2 font-bold">
              <span>Total</span>
              <span className="text-blue-600">{formatCurrency(display.deliveryFee)}</span>
            </div>
          </div>

          {display.rider && (
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4">Assigned Rider</h2>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  {display.rider.name?.charAt(0) || "R"}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{display.rider.name}</p>
                  <p className="text-xs text-slate-400">⭐ {display.rider.rating} rating</p>
                </div>
                <FaMotorcycle className="text-blue-500 ml-auto" size={20} />
              </div>
            </div>
          )}
        </div>
      </div>

      {display.notes && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <h2 className="font-bold text-slate-800 mb-2">Notes</h2>
          <p className="text-slate-600 text-sm">{display.notes}</p>
        </div>
      )}
    </div>
  );
}