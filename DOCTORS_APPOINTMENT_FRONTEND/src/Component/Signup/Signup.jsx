import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import swal from "sweetalert"

const validationSchema = yup.object({
  firstName: yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name can only contain letters')
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name cannot exceed 50 characters'),

  lastName: yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Last name can only contain letters')
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot exceed 50 characters'),

  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),

  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
});

const Signup = () => {

  let url="https://hospital-ooo.vercel.app/user/signup"

  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: { 
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
      existingUsers.push(values);
      localStorage.setItem('userData', JSON.stringify(existingUsers));
  
      console.log(values);
  
      // Make the API request to sign up the user
      axios.post(url, values)
        .then((result) => {
          console.log(result);
          swal({
            title: "Success",
            text: "User created successfully",
            icon: "success"
          });
          // Only navigate to the sign-in page if the sign-up is successful
          navigate('/signIn');
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Error",
            text: "User not Registered",
            icon: "error"
          });
          // Do not navigate to the sign-in page on error
        });
    },
    validationSchema
  });
  

  return (
    <div className="signup-container">
      <div className="glassmorphism-card">
      <div className="logo-container">
            {/* <div className="trinity-knot"></div>   */}
            <div className="logo-text">
              <h1>Trinity Care</h1>
              <h2>Hospital</h2>
            </div>
          </div>   
        <h4 className='mt-2' style={{color:" #008080"}}>Create an account</h4>
        {/* <p className='user'>Please enter your details to book an appointment</p> */}

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              {...formik.getFieldProps('firstName')}
              className={`formInput ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              {...formik.getFieldProps('lastName')}
              className={`formInput ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
              className={`formInput ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className={`formInput ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="register-forget">
            <label style={{color:" #008080"}}>
              <input
                type="checkbox"
                required
              /> I agree to the terms & conditions
            </label>
          </div>

          <button type="submit" className='mt-3 ' >Sign Up</button>
          <p className='mt-3' style={{color:" #008080"}}>Already have an account? <Link to="/user/signIn" className='SignInLink fw-bold'>Sign in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
