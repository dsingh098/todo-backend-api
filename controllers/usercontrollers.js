import User from "../models/usermodels.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";

/* ===========================
   SIGNUP
=========================== */
export const signup = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    // Validation
    if (!name || !userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check existing user
    const existUser = await User.findOne({
      $or: [{ email }, { userName }]
    });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      userName,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Signup Error:", err);

    return res.status(500).json({
      message: "Server error"
    });
  }
};


/* ===========================
   LOGIN
=========================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // Find user with password
    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login Error:", err);

    return res.status(500).json({
      message: "Server error"
    });
  }
};


/* ===========================
   LOGOUT
=========================== */
export const logout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful"
  });
};


/* ===========================
   DELETE USER
=========================== */
export const deleteUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    await User.findByIdAndDelete(req.user._id);

    res.clearCookie("token");

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (err) {
    console.error("Delete User Error:", err);

    return res.status(500).json({
      message: "Server error"
    });
  }
};
