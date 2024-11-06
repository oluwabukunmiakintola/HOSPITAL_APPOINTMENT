import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Tlogo from "../../../assets/Tlogo.png";

const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      if (email === 'moyinoluwaadigun390@gmail.com' && password === 'Moyin123') {
        localStorage.setItem('adminToken', 'exampleToken');
        console.log('Login successful, navigating to dashboard...');
        navigate('/admin/dashboard');
      } else {
        alert('Invalid credentials');
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center signup-container">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 glassmorphism-card">
        <form onSubmit={formik.handleSubmit}>
          <div className='text-center'>
            <img
              src={Tlogo}
              alt="Winfield Logo"
              className="logo img-fluid"
              style={{ width: '40px', cursor: "pointer" }} 
            />
          </div>

          <div className="logo-text text-center">
            <h1>WinField <span style={{color:" #2890cd"}}>Hospital</span></h1>
          </div>
          <p className="text-center fw-bold mt-3" style={{color:" #008080"}}>{state} Login</p>

          <div>
            <p>Email</p>
            <input 
              name="email"
              type="email" 
              className="form-control" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.email} 
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <p>Password</p>
            <input 
              name="password"
              type="password" 
              className="form-control" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.password} 
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Login
          </button>

          {state === "Admin" ? (
            <p className='mt-3'>
              Doctor Login? <span onClick={() => setState("Doctor")} style={{ cursor: "pointer", color:" #008080" }}>Click here</span>
            </p>
          ) : (
            <p className='mt-3'>
              Admin Login? <span onClick={() => setState("Admin")} style={{ cursor: "pointer", color:" #008080" }}>Click here</span>
            </p>
          )}

          <p className='mt-3' style={{color:" #008080"}}>
            Don't have an account? 
            <Link to="/admin/signup" className='SignInLink fw-bold'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
