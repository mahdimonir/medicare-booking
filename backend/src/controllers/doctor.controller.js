import { Booking } from "../models/Booking.model.js";
import { Doctor } from "../models/Doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const updateDoctor = await Doctor.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true } // Return the updated document
  );

  if (!updateDoctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateDoctor, "Doctor updated successfully"));
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deleteDoctor = await Doctor.findByIdAndDelete(id).select("-password");
  if (!deleteDoctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteDoctor, "Doctor deleted successfully"));
});

const getSingleDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const doctor = await Doctor.findById(id)
    .populate("reviews")
    .select("-password");
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor fetched successfully"));
});

const getAllDoctor = asyncHandler(async (req, res) => {
  const { query } = req.query;
  let doctors;

  if (query) {
    doctors = await Doctor.find({
      isApproved: "approved",
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
  } else {
    doctors = await Doctor.find({
      isApproved: "approved",
    }).select("-password");
  }

  if (!doctors || doctors.length === 0) {
    throw new ApiError(404, "No doctors found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});

const getDoctorProfile = asyncHandler(async (req, res) => {
  const doctorId = req.userId;

  const doctor = await Doctor.findById(doctorId).select("-password");
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  // const [password, ...rest] = doctor._doc;
  const { password, ...rest } = doctor._doc;
  const appointments = await Booking.find({ doctor: doctorId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...rest, appointments },
        "Profile info retrieved successfully"
      )
    );
});

export {
  deleteDoctor,
  getAllDoctor,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
};
