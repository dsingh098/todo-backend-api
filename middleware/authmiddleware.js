import jwt from "jsonwebtoken";
import User from "../models/usermodels.js";

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.cookies.token;

    // 2. Check token
    if (!token) {
      return res.status(401).json({
        message: "Login first"
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // 5. Attach user to request
    req.user = user;

    // 6. Go to next route
    next();

  } catch (err) {
    console.error("Protect Error:", err);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
