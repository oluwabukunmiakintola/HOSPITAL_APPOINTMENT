import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Tlogo from "../../../assets/Tlogo.png";

// Validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup.string().required("Password is required"),
  specialization: yup.string().required("Specialization is required"), // Add validation for specialization
});

const AdminSignup = () => {
  const [state, setState] = useState("Doctor's");

  const url = "https://hospital-ooo.vercel.app/user/AdminSignup";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      specialization: "", // Initialize specialization
    },
    onSubmit: (values) => {
      axios
        .post(url, values)
        .then((response) => {
          const { data } = response;

          if (data.success) {
            console.log("Sign in successful");
            navigate("/admin/Dashboard");
          } else {
            formik.setFieldError("email", "Invalid email or password");
            formik.setFieldError("password", "Invalid email or password");
          }
        })
        .catch((err) => {
          console.error(err);
          formik.setFieldError("email", "Invalid email or password");
          formik.setFieldError("password", "Invalid email or password");
        });
    },
    validationSchema,
  });

  return (
    <div className="signup-container">
      <div className="glassmorphism-card">
        <div className="text-center">
          <img
            src={Tlogo}
            alt="Winfield Logo"
            className="logo img-fluid"
            style={{ width: "40px", cursor: "pointer" }}
          />
          <div className="logo-text">
            <h1>
              WinField <span style={{ color: "#2890cd" }}>Hospital</span>
            </h1>
          </div>
        </div>
        <p className="text-center fw-bold mt-3" style={{ color: "#008080" }}>
          <span>{state}</span> Signup
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
              className={`formInput ${
                formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""
              }`}
              aria-describedby="firstNameHelp"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div id="firstNameHelp" className="invalid-feedback">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
              className={`formInput ${
                formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""
              }`}
              aria-describedby="lastNameHelp"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div id="lastNameHelp" className="invalid-feedback">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className={`formInput ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              aria-describedby="emailHelp"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id="emailHelp" className="invalid-feedback">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className={`formInput ${
                formik.touched.password && formik.errors.password ? "is-invalid" : ""
              }`}
              aria-describedby="passwordHelp"
            />
            {formik.touched.password && formik.errors.password ? (
              <div id="passwordHelp" className="invalid-feedback">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              {...formik.getFieldProps("specialization")}
              className={`formInput ${
                formik.touched.specialization && formik.errors.specialization ? "is-invalid" : ""
              }`}
              aria-describedby="specializationHelp"
            />
            {formik.touched.specialization && formik.errors.specialization ? (
              <div id="specializationHelp" className="invalid-feedback">
                {formik.errors.specialization}
              </div>
            ) : null}
          </div>

          <button type="submit" className="mt-3" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="mt-3" style={{ color: "#008080" }}>
            Already have an account?
            <Link to="/admin/login" className="SignInLink fw-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
