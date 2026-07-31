import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    serviceType: {
      type: String,
      enum: ["Food", "Grocery", "Pharmacy", "Parcel"],
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    pickupLocation: {
      latitude: Number,
      longitude: Number,
    },

    deliveryLocation: {
      latitude: Number,
      longitude: Number,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Assigned",
        "Picked Up",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Pending",
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    estimatedTime: {
      type: Number,
      default: 0,
    },

    distance: {
      type: Number,
      default: 0,
    },

    aiPriority: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    pickedUpAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    tracking: [
      {
        status: {
          type: String,
          required: true,
        },

        message: {
          type: String,
          default: "",
        },

        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;