import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';
import Tlogo from '../../assets/Tlogo.png';

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
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

const Signup = () => {
  // const url = 'https://hospital-ooo.vercel.app/user/signup';
  const url = 'http://localhost:5000/user/signup'
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(url, values);
        console.log(response)
        const { token, user } = response.data;
    
        if (token && user) {
          localStorage.setItem('authtoken', token);
          localStorage.setItem('userInfo', JSON.stringify(user));
        }
    
        swal({
          title: 'Success',
          text: 'User created successfully',
          icon: 'success',
        });
    
        navigate('/user/signIn');
      } catch (err) {
        // Improved error handling
        console.error('Error during signup:', err);
    
        const errorMessage = err.response?.data?.message || 'User not Registered';
        swal({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
        });
      }
    },
    
    validationSchema,
  });

  return (
    <div className="signup-container ">
      <div className="glassmorphism-card">
        <div className="d-flex">
          <img
            src={Tlogo}
            alt="Trinity Care Logo"
            className="logo img-fluid"
            style={{ width: '40px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <div className="logo-text">
            <h1>WinField</h1>
            <h2>Hospital</h2>
          </div>
        </div>
        <h4 className="mt-2" style={{ color: '#008080' }}>Create account to book appointment</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps('firstName')}
              className={`formInput ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps('lastName')}
              className={`formInput ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`formInput ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className={`formInput ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="register-forget">
            <label style={{ color: '#008080' }}>
              <input type="checkbox" required /> I agree to the terms & conditions
            </label>
          </div>

          <button type="submit" className="mt-3">
            Sign Up</button>
          <p className="mt-3" style={{ color: '#008080' }}>Already have an account? <Link to="/user/signIn" className="SignInLink fw-bold">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
