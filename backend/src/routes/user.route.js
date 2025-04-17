import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getMyAppointments,
  getSingleUser,
  getUserProfile,
  updateUser,
} from "../controllers/user.controller.js";
import { authorized, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(authorized(["admin"]), getAllUser);
router
  .route("/:id")
  .get(authorized(["patient"]), getSingleUser)
  .put(authorized(["patient"]), updateUser)
  .delete(authorized(["patient"]), deleteUser);

router.route("/profile/me").get(authorized(["patient"]), getUserProfile);

router
  .route("/appointments/my-appointments")
  .get(authorized(["patient"]), getMyAppointments);

export default router;
