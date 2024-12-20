import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Tlogo from "../../assets/Tlogo.png";
import Swal from 'sweetalert2'; 

const validationSchema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string()
    .required('Password is required')
});

const SignIn = () => {
  const url = "https://hospital-ooo.vercel.app/user/signIn";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: { 
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => { 
      setLoading(true);  

      axios.post(url, values)
        .then((result) => {
          const { data } = result; 
          
          // Assuming your API returns a success flag and a document ID
          if (data.message=="Signed in successfully") {
            console.log('Sign in successful');
            const docId = data.docId; // Adjust based on your API response
            navigate(`/appointment/${docId}`); // Navigate to appointment with docId
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Invalid email or password',
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        })
        .finally(() => {
          setLoading(false); 
        });
    },
  });

  return (
    <div className="signup-container">
      <div className="glassmorphism-card">
        <div className='d-flex'>
          <img
            src={Tlogo}
            alt="Trinity Care Logo"
            className="logo img-fluid"
            style={{ width: '40px', cursor: "pointer" }} 
            onClick={() => navigate('/')}
          />
          <div className="logo-text">
            <h1>WinField</h1>
            <h2>Hospital</h2>
          </div>
        </div>
        <h4 className='mt-2' style={{color:" #008080"}}>Login your account to book appointment</h4>

        <form onSubmit={formik.handleSubmit}>
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

          <button type="submit" className='mt-3' disabled={formik.isSubmitting || loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <p className='mt-3' style={{color:" #008080"}}>
            Don't have an account? 
            <Link to="/user/signup" className='SignInLink fw-bold'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
