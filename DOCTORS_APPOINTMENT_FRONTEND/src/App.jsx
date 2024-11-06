import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './AdminSidebar.css';
import 'react-toastify/dist/ReactToastify.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import "react-calendar/dist/Calendar.css";
import Layout from './Component/Layout/Layout';
import UserLayout from './Component/UserLayout/UserLayout';
import Signup from './Component/Signup/Signup';
import SignIn from './Component/SignIn/SignIn';
import HomePage from './Component/Home/HomePage';
import Doctors from './Component/Doctors/Doctors';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import MyProfile from './Component/MyProfile/MyProfile';
import MyAppointment from './Component/My Appointment/MyAppointment';
import Appointment from './Component/Appointment/Appointment';
import NotFound from './Component/Error/NotFound';
import AdminSignup from './Component/Admin/AdminSignup/AdminSignup';
import AdminLogin from './Component/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './Component/Admin/AdminDashboard/AdminDashboard';
import AdminLayout from './Component/Admin/AdminLayout/AdminLayout';
import AdminNavbar from './Component/Admin/AdminNavbar/AdminNavbar';
import DoctorsList from './Component/Admin/DoctorsList/DoctorsList'; 
import AllAppointment from './Component/Admin/AllAppointment/AllAppointment'
import AddedDoctors from './Component/Admin/AddedDoctors/AddedDoctors'; 

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true); 
    } else {
      setIsAdminLoggedIn(false); 
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); 
    setIsAdminLoggedIn(false); 
  };

  return (
    <>
      <Routes>
        {/* User Layout with SignIn and Signup */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="*" element={<Navigate to="/user/signIn" />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Main Layout for non-admin pages */}
        <Route path='/' element={<Layout />}>
          <Route path='' element={<HomePage />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:speciality" element={<Doctors />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="my-appointment" element={<MyAppointment />} />
          <Route path="appointment/:docId" element={<Appointment />} />
        </Route>

        {/* Admin Layout */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route
            path='dashboard'
            element={
              isAdminLoggedIn ? (
                <>
                  <AdminNavbar handleLogout={handleLogout} />
                  <AdminDashboard />
                </>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path='doctors-list'
            element={
              isAdminLoggedIn ? (
                <>
                  <AdminNavbar handleLogout={handleLogout} />
                  <DoctorsList />
                </>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path='appointments'
            element={
              isAdminLoggedIn ? (
                <>
                  <AdminNavbar handleLogout={handleLogout} />
                  <AllAppointment />
                </>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path='add-doctor'
            element={
              isAdminLoggedIn ? (
                <>
                  <AdminNavbar handleLogout={handleLogout} />
                  <AddedDoctors />
                </>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route path='signup' element={<AdminSignup />} />
          <Route path='login' element={<AdminLogin />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
