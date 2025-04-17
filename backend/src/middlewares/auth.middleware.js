import jwt from "jsonwebtoken";
import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Middleware to authenticate users
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.authorization;

  // Check if the token exists and starts with "Bearer"
  if (!authToken || !authToken.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const token = authToken?.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach user details to the request object
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired, please login again");
    }
    throw new ApiError(401, "Login to access this");
  }
});

// Middleware to authorized access based on roles
export const authorized = (role) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    // Find the user in either the User or Doctor model
    const user =
      (await User.findById(userId).select("-password")) ||
      (await Doctor.findById(userId).select("-password"));

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if the user's role is allowed
    if (!role.includes(user.role)) {
      throw new ApiError(403, "You are not authorized");
    }

    next();
  });
