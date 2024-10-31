import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Tlogo from "../../../assets/Tlogo.png";


// Validation schema
const validationSchema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string()
    .required('Password is required')
});

const AdminSignup = () => {
    const [state, setState] = useState("Admin");

  const url = "https://hospital-ooo.vercel.app/user/AdminSignup";
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: { 
      email: '',
      password: ''
    },
    onSubmit: (values) => { 
      axios.post(url, values)
        .then(response => {
          const { data } = response; 
          
          if (data.success) {
            console.log('Sign in successful');
            const docId = data.docId; 
            navigate('/admin/Dashboard'); 
          } else {
            formik.setFieldError('email', 'Invalid email or password');
            formik.setFieldError('password', 'Invalid email or password');
          }
        })
        .catch(err => {
          console.error(err);
          formik.setFieldError('email', 'Invalid email or password');
          formik.setFieldError('password', 'Invalid email or password');
        });
    },
    validationSchema
  });

  return (
    <div className="signup-container">
      <div className="glassmorphism-card">
        <div className='text-center'>
          <img
            src={Tlogo}
            alt="Winfield Logo"
            className="logo img-fluid"
            style={{ width: '40px', cursor: "pointer" }} 
            // onClick={() => navigate('/')}
          />
          <div className="logo-text">
            <h1>WinField <span style={{color:" #2890cd"}}>Hospital</span></h1>
          </div>
        </div>
        <p className="text-center fw-bold mt-3" style={{color:" #008080"}}><span>{state}</span> Signup</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="First Name"
              {...formik.getFieldProps('email')}
              className={`formInput ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              aria-describedby="emailHelp"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id="emailHelp" className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Last Name"
              {...formik.getFieldProps('email')}
              className={`formInput ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              aria-describedby="emailHelp"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id="emailHelp" className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
              className={`formInput ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              aria-describedby="emailHelp"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id="emailHelp" className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className={`formInput ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              aria-describedby="passwordHelp"
            />
            {formik.touched.password && formik.errors.password ? (
              <div id="passwordHelp" className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className='mt-3' disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>

          {
            state === "Admin" 
              ? <p className='text-bold'>Doctor Login? <span className='underline' onClick={() => setState("Doctor")} style={{ cursor: "pointer", color:"#008080" }}>Click here</span></p>
              : <p>Admin Login? <span className=' underline' onClick={() => setState("Admin")} style={{ cursor: "pointer",color:"#008080"  }}>Click here</span></p>
          }

          {/* <p className='mt-3' style={{color:" #008080"}}>
            Don't have an account? 
            <Link to="/user/signup" className='SignInLink fw-bold'>Sign up</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
