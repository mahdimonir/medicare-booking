import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  if (!["patient", "doctor"].includes(role)) {
    throw new ApiError(400, "Invalid role specified");
  }

  // Check if email exists in either User or Doctor collection
  const existingUser = await User.findOne({ email });
  const existingDoctor = await Doctor.findOne({ email });

  if (existingUser || existingDoctor) {
    throw new ApiError(409, "User with this email already exists");
  }

  const userModel = role === "patient" ? User : Doctor;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
    gender,
    photo,
  });

  const createdUser =
    (await User.findById(user._id).select("-password")) ||
    (await Doctor.findById(user._id).select("-password"));

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user =
    (await User.findOne({ email })) || (await Doctor.findOne({ email }));

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Incorrect credentials");
  }

  const token = generateToken(user);
  const { password: _, ...userData } = user._doc;

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: userData,
          token,
        },
        "User logged in successfully"
      )
    );
});

export { login, register };
