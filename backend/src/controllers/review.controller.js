import { Doctor } from "../models/Doctor.model.js";
import { Review } from "../models/Review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// get all reviews
export const getAllReviews = asyncHandler(async (req, res) => {
  const { rating, doctorId, limit } = req.query; // Extract query parameters

  // Build the query object dynamically
  const query = {};
  if (rating) query.rating = Number(rating); // Filter by rating
  if (doctorId) query.doctor = doctorId; // Filter by doctor ID

  // Fetch reviews, sort by creation date (latest first), and limit the results
  const reviews = await Review.find(query)
    .populate("user", "name photo") // Populate user details
    .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
    .limit(Number(limit)); // Limit the number of results (default to 6)

  res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});

// create review
export const createReview = asyncHandler(async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    const populatedReview = await savedReview.populate("user", "name photo");

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });
    res
      .status(200)
      .json(
        new ApiResponse(201, populatedReview, "Review created successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});
