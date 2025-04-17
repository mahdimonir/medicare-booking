import React from "react";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import DoctorDashboard from "../Dashboard/Doctor/DoctorDashboard";
import UserDashboard from "../Dashboard/User/UserDashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DoctorsDetails from "../pages/Doctors/DoctorDetails";
import Doctors from "../pages/Doctors/Doctors";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

import { Navigate, Route, Routes } from "react-router-dom";
import CheckoutStatus from "../components/checkout/checkoutStatus";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout-status" element={<CheckoutStatus />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Routers;
