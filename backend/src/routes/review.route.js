import { Router } from "express";
import {
  createReview,
  getAllReviews,
} from "../controllers/review.controller.js";
import { authorized, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(verifyJWT, authorized(["patient"]), createReview);

export default router;
