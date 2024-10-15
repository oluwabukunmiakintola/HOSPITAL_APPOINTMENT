import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdminContext } from '../Context/AdminContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${backendUrl}api/admin/login`, {
          email: values.email,
          password: values.password,
        });

        if (data.success) {
          console.log(data.token);
          localStorage.setItem("aToken", data.token);
          setAToken(data.token); 
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error('An error occurred. Please try again.'); 
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <form className='d-flex flex-column gap-3 border rounded shadow-lg p-4'
         onSubmit={formik.handleSubmit}>
          <p className="text-center fw-bold"><span>{state}</span> Login</p>

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
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Login
          </button>

          {
            state === "Admin" 
              ? <p>Doctor Login? <span className='text-success underline' onClick={() => setState("Doctor")} style={{ cursor: "pointer" }}>Click here</span></p>
              : <p>Admin Login? <span className='text-success underline' onClick={() => setState("Admin")} style={{ cursor: "pointer" }}>Click here</span></p>
          }
        </form>
        <ToastContainer /> 
      </div>
    </div>
  );
}

export default AdminLogin;
