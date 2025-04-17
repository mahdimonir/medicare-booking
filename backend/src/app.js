// Import dependencies
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// Import routes
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.route.js";
import bookingRouter from "./routes/booking.route.js";
import doctorRouter from "./routes/doctor.route.js";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.route.js";

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello from Express server!!");
});

// Error-handler
app.use(errorHandler);

// Export the app
export { app };
