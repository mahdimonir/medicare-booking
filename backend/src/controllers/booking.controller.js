import Stripe from "stripe";
import { Booking } from "../models/Booking.model.js";
import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCheckoutSession = asyncHandler(async (req, res) => {
  // Validate doctor and user
  const doctor = await Doctor.findById(req.params.doctorId);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  const user = await User.findById(req.userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.CLIENT_SITE_URL}/checkout-status?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_SITE_URL}/checkout-status?status=cancel&doctorId=${req.params.doctorId}`,
    customer_email: user.email,
    client_reference_id: JSON.stringify({
      doctorId: req.params.doctorId,
      userId: req.userId,
    }), // Pass both doctorId and userId
    line_items: [
      {
        price_data: {
          currency: "bdt",
          unit_amount: doctor.ticketPrice * 100, // Ensure ticketPrice is valid
          product_data: {
            name: doctor.name,
            description: doctor.bio,
            images: [doctor.photo],
          },
        },
        quantity: 1,
      },
    ],
  });

  if (!session) {
    throw new ApiError(500, "Error creating checkout session");
  }

  // Return session details
  return res
    .status(200)
    .json(
      new ApiResponse(200, session, "Checkout session created successfully")
    );
});

const saveBooking = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new ApiError(400, "Session ID is required");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Retrieve the session from Stripe
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("Error retrieving Stripe session:", error.message);
    throw new ApiError(500, "Error retrieving Stripe session");
  }

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  // Check if the session has already been processed
  const existingBooking = await Booking.findOne({ session: session.id });
  if (existingBooking) {
    return res
      .status(200)
      .json({ message: "Booking already saved", booking: existingBooking });
  }

  // Parse client_reference_id to get doctorId and userId
  let doctorId, userId;
  try {
    ({ doctorId, userId } = JSON.parse(session.client_reference_id));
  } catch (error) {
    console.error("Error parsing client_reference_id:", error.message);
    throw new ApiError(500, "Invalid client_reference_id format");
  }

  const doctor = await Doctor.findById(doctorId);
  const user = await User.findById(userId);

  if (!doctor || !user) {
    throw new ApiError(404, "Doctor or User not found");
  }

  // Save booking in the database
  const booking = new Booking({
    doctor: doctor._id,
    user: user._id,
    ticketPrice: doctor.ticketPrice,
    session: session.id,
  });

  await booking.save();

  res.status(201).json({ message: "Booking saved successfully", booking });
});

const validateSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res
      .status(400)
      .json({ isValid: false, message: "Session ID is required" });
  }

  // Check if the session already exists in the database
  const existingBooking = await Booking.findOne({ session: sessionId });
  if (existingBooking) {
    return res
      .status(200)
      .json({ isValid: false, message: "Session already processed" });
  }

  res.status(200).json({ isValid: true });
});

const CoSBooking = asyncHandler(async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const doctor = await Doctor.findById(req.body.doctor);
  const user = await User.findById(req.body.user);

  if (!doctor || !user) {
    throw new ApiError(404, "Doctor or User not found");
  }

  // Save booking in the database
  const booking = new Booking({
    doctor: doctor._id,
    user: user._id,
    ticketPrice: doctor.ticketPrice,
    isPaid: false,
  });
  await booking.save();
  return res
    .status(200)
    .json(new ApiResponse(201, booking, "Booking saved successfully"));
});

export { CoSBooking, getCheckoutSession, saveBooking, validateSession };
