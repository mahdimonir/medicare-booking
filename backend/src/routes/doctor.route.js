import { Router } from "express";
import {
  deleteDoctor,
  getAllDoctor,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
} from "../controllers/doctor.controller.js";
import { authorized, verifyJWT } from "../middlewares/auth.middleware.js";
import reviewRouter from "./review.route.js";

const router = Router();

// nested routes
router.use("/:doctorId/reviews", reviewRouter);

router.route("/").get(getAllDoctor);
router
  .route("/:id")
  .get(getSingleDoctor)
  .put(verifyJWT, authorized(["doctor"]), updateDoctor)
  .delete(verifyJWT, authorized(["doctor"]), deleteDoctor);

router
  .route("/profile/me")
  .get(verifyJWT, authorized(["doctor"]), getDoctorProfile);
// .get(getDoctorProfile);

export default router;
