import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";

export default function CreateOrder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceType: "Food",
    pickupAddress: "",
    deliveryAddress: "",
    deliveryFee: "",
    estimatedTime: "",
    notes: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createOrder({
        ...formData,
        pickupLocation: {
          latitude: 23.2599,
          longitude: 77.4126,
        },
        deliveryLocation: {
          latitude: 23.2335,
          longitude: 77.4065,
        },
      });

      alert("Order Created Successfully!");
      navigate("/customer/orders");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create New Order
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option>Food</option>
          <option>Grocery</option>
          <option>Pharmacy</option>
          <option>Parcel</option>
        </select>

        <input
          name="pickupAddress"
          placeholder="Pickup Address"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <input
          name="deliveryAddress"
          placeholder="Delivery Address"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="deliveryFee"
          placeholder="Delivery Fee"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="estimatedTime"
          placeholder="Estimated Time (minutes)"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          className="w-full border rounded-xl p-3"
          rows="4"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Create Order
        </button>

      </form>
    </div>
  );
}