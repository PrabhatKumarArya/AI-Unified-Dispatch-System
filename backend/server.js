import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import riderRoutes from "./routes/riderRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ========================================== 
// CORS Configuration 
// ========================================== 
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.BACKEND_URL,
];

app.use(cors({ origin: function (origin, callback) { 
  // Allow requests without an origin 
  // such as Postman or server-to-server requests 
    if (!origin) { 
      return callback(null, true); 
    } 
    if (allowedOrigins.includes(origin)) { 
      return callback(null, true); 
    } 
    return callback( new Error("Not allowed by CORS") ); 
  },
  credentials: true,
  methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", ], 
  allowedHeaders: [ "Content-Type", "Authorization", ], }) 
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "AI Unified Dispatch Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/riders", riderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications",notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});