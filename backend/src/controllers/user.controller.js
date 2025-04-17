import { Booking } from "../models/Booking.model.js";
import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true } // Return the updated document
  );

  if (!updateUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "User updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deleteUser = await User.findByIdAndDelete(id).select("-password");
  if (!deleteUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteUser, "User deleted successfully"));
});

const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (!users || users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const { password, ...rest } = user._doc;

  return res
    .status(200)
    .json(
      new ApiResponse(200, { ...rest }, "Profile info retrieved successfully")
    );
});

const getMyAppointments = asyncHandler(async (req, res) => {
  // step-1: retrive appointments from booking for specific user
  const bookings = await Booking.find({ user: req.userId });

  // step-2: extract doctor id from appointment
  const doctorIds = bookings.map((booking) => booking.doctor.id);

  // step-3: retrive doctors info using doctor id
  const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
    "-password"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "Appointments fetched successfully"));
});

export {
  deleteUser,
  getAllUser,
  getMyAppointments,
  getSingleUser,
  getUserProfile,
  updateUser,
};
