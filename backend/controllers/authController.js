import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ========================================== 
// Forgot Password - Send OTP
// ========================================== 
export const forgotPassword = async (req, res) => { 
  try { 
    const { email } = req.body;
    if (!email) { 
      return res.status(400).json({ 
        success: false, 
        message: "Email is required", 
      }); 
    } 
    const normalizedEmail = email.toLowerCase().trim(); 
    const user = await User.findOne({ 
      email: normalizedEmail, }); 
    // Don't reveal whether an account exists 
    if (!user) { 
      return res.status(200).json({ 
        success: true, 
        message: "If an account exists with this email, an OTP has been sent.", 
      }); 
    } 
    // Generate 6-digit OTP 
    const otp = crypto .randomInt(100000, 1000000) .toString(); 
    // OTP valid for 10 minutes 
    const expiryMinutes = 10; 
    const otpExpires = new Date( Date.now() + expiryMinutes * 60 * 1000 ); 
    // Store reset information 
    user.resetOTP = otp; 
    user.resetOTPExpires = otpExpires; 
    user.resetOTPVerified = false; 
    await user.save(); 
    // Send OTP through Gmail 
    await sendOTPEmail( user.email, otp, expiryMinutes ); 
    return res.status(200).json({ 
      success: true, 
      message: "If an account exists with this email, an OTP has been sent.", 
    }); 
  } catch (error) { 
    console.error( "Forgot Password Error:", error ); 
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP", 
    }); 
  } 
};
// ========================================== 
// Verify OTP 
// ==========================================
export const verifyOTP = async (req, res) => { 
  try { 
    const { email, otp } = req.body;
    if (!email || !otp) { 
      return res.status(400).json({ 
        success: false, 
        message: "Email and OTP are required", 
      }); 
    } 
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ 
      email: normalizedEmail, 
    }); 
    if (!user) { 
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP", 
      }); 
    }
    // Check whether OTP exists 
    if ( !user.resetOTP || !user.resetOTPExpires ) { 
      return res.status(400).json({ 
        success: false, 
        message: "OTP not found", 
      }); 
    } 
    // Check expiry 
    if ( new Date() > new Date(user.resetOTPExpires) ) { 
      user.resetOTP = null; 
      user.resetOTPExpires = null; 
      user.resetOTPVerified = false; 
      await user.save(); 
      return res.status(400).json({ 
        success: false, 
        message: "OTP has expired", 
      }); 
    } 
    // Check OTP 
    if ( String(user.resetOTP) !== String(otp).trim() ) { 
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP", 
      }); 
    } 
    // OTP verified 
    user.resetOTPVerified = true; 
    await user.save(); 
    return res.status(200).json({ 
      success: true, 
      message: "OTP verified successfully", 
    }); 
  } catch (error) { 
    console.error( "Verify OTP Error:", error ); 
    return res.status(500).json({ 
      success: false, 
      message: "Failed to verify OTP", 
    }); 
  } 
};
// ==========================================
// Reset Password
// ========================================== 
export const resetPassword = async (req, res) => { 
  try { 
    const { email, newPassword, } = req.body; 
    if (!email || !newPassword) { 
      return res.status(400).json({ 
        success: false, 
        message: "Email and new password are required", 
      }); 
    } 
    if (newPassword.length < 6) { 
      return res.status(400).json({ 
        success: false, 
        message: "Password must contain at least 6 characters", 
      }); 
    } 
    const normalizedEmail = email.toLowerCase().trim(); 
    const user = await User.findOne({ 
      email: normalizedEmail, 
    }); 
    if (!user) { 
      return res.status(400).json({ 
        success: false, 
        message: "Invalid request", 
      }); 
    } 
    // OTP must be verified first 
    if (!user.resetOTPVerified) { 
      return res.status(403).json({ 
        success: false, 
        message: "Please verify OTP first", 
      }); 
    } 
    // Hash new password 
    const hashedPassword = await bcrypt.hash( newPassword, 10 ); 
    user.password = hashedPassword; 
    // Clear OTP information 
    user.resetOTP = null;
    user.resetOTPExpires = null;
    user.resetOTPVerified = false; 
    await user.save(); 
    return res.status(200).json({ 
      success: true, 
      message: "Password reset successfully", 
    }); 
  } catch (error) { 
    console.error( "Reset Password Error:", error ); 
    return res.status(500).json({ 
      success: false,
      message: "Failed to reset password", 
    }); 
  } 
};