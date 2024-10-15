import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Component/Layout/Layout';
import UserLayout from './Component/UserLayout/UserLayout';
import Signup from './Component/Signup/Signup';
import SignIn from './Component/SignIn/SignIn';
import Dashboard from './Component/UserDashboard/Dashboard';
import HomePage from './Component/Home/HomePage';
import Doctors from './Component/Doctors/Doctors';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import MyProfile from './Component/MyProfile/MyProfile';
import MyAppointment from './Component/My Appointment/MyAppointment';
import Appointment from './Component/Appointment/Appointment';
import NotFound from './Component/Error/NotFound';

function App() {
  return (
    <>
      <Routes>
        {/* User Layout with SignIn and Signup */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/signIn" />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/user/signIn" />} />
        </Route>

        {/* Main Layout */}
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

        {/* Catch-all for undefined routes */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
