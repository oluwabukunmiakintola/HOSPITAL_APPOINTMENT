import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
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
import { AuthContext } from './Component/Context/AuthContext'; 

function App() {
  const { user } = useContext(AuthContext); // Use AuthContext to get user

  return (
    <>
      <Routes>
        {/* User Layout with SignIn and Signup */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="*" element={<Navigate to="/user/signIn" />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Main Layout for user pages */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:speciality" element={<Doctors />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Protected Routes */}
          <Route path="my-profile" element={ <MyProfile />} />
          <Route path="my-appointment" element={user ? <MyAppointment /> : <Navigate to="/user/signIn" />} />
          <Route path="appointment/:docId" element={user ? <Appointment /> : <Navigate to="/user/signIn" />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />/
        {/* <Route path='*' element={<NotFound/>}></Route> */}
      </Routes>
    </>
  );
}

export default App;
