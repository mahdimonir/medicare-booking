import { Router } from "express";
import {
  CoSBooking,
  getCheckoutSession,
  saveBooking,
  validateSession,
} from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/checkout-session/:doctorId").post(getCheckoutSession);
router.route("/save").post(saveBooking);
router.route("/validate-session").post(validateSession);
router.route("/cos/save").post(CoSBooking);

export default router;
