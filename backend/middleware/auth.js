// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Set JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Set user in req object
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route"
    });
  }
};

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};