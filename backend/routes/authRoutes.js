import express from "express";
import { login, register, getMe, forgotPassword, verifyOTP, resetPassword,

} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// Forgot password 
router.post( "/forgot-password", forgotPassword ); 
// Verify OTP 
router.post( "/verify-otp", verifyOTP ); 
// Reset password
router.post( "/reset-password", resetPassword );

router.get("/me", protect, getMe);

export default router;