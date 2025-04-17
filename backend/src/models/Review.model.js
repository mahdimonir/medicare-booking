import { Schema, model } from "mongoose";
import { Doctor } from "./Doctor.model.js";

const reviewSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

// Automatically populate user and doctor fields
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  }).populate({
    path: "doctor",
    select: "name specialization",
  });

  next();
});

// Static method to calculate average rating and number of ratings for a doctor
reviewSchema.statics.calculateAverageRating = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        numOfRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0] ? stats[0].numOfRatings : 0,
    averageRating: stats[0] ? stats[0].avgRating.toFixed(1) : 0,
  });
};

// Trigger `calculateAverageRating` after saving a review
reviewSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.doctor);
});

// Trigger `calculateAverageRating` after updating or deleting a review
reviewSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.doctor);
  }
});

reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.doctor);
  }
});

export const Review = model("Review", reviewSchema);
