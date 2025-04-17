import { Schema, model } from "mongoose";

const DoctorSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    photo: {
      type: String,
    },
    ticketPrice: {
      type: Number,
    },
    role: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    // Fields for doctors only
    specialization: {
      type: String,
    },
    qualifications: {
      type: Array,
    },

    experiences: {
      type: Array,
    },

    bio: {
      type: String,
      maxLength: 50,
    },
    about: {
      type: String,
    },
    timeSlots: {
      type: Array,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = model("Doctor", DoctorSchema);
