import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string()
    .required('Password is required')
});

const SignIn = () => {
  const users = JSON.parse(localStorage.getItem("userData"))||[];
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { 
      email: '',
      password: ''
    },
    onSubmit: (values) => { 
        if(users.email === users.email && users.password === users.password ){
          console.log('sign in successful');
          navigate('/Dashboard');
        }else{          
            formik.setFieldError('email', 'Invalid email or password');
            formik.setFieldError('password', 'Invalid email or password');
        }
    },
    validationSchema
  });

  return (
    <div className="signup-container">
      <div className="glassmorphism-card">
        <div>
           <div className="logo-container">
            {/* <div className="trinity-knot"></div>   */}
            <div className="logo-text">
              <h1>Trinity Care</h1>
              <h2>Hospital</h2>
            </div>
          </div>    
          </div>
        <h4 className='mt-2' style={{color:" #008080"}}>Login to your account</h4>

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

          <button type="submit" className='mt-3' disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>

          <p className='mt-3'  style={{color:" #008080"}}>
            Don't have an account? 
            <Link to="/signup" className='SignInLink fw-bold'>Sign up</Link>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default SignIn;
