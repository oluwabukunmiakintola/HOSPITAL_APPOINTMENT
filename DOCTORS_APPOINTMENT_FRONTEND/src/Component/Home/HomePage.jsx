import React from 'react';
import image from '../../assets/GroupDoc.png';
import SpecialityMenu from '../Speciality/SpecialityMenu';
import TopDoctors from '../TopDoctors/TopDoctors';
import BookAppointment from '../Book Appointment/BookAppointment';

const HomePage = () => {
  return (
    <>
      <div className='container-fluid d-flex flex-column flex-lg-row align-items-center' style={{minHeight:"550px", background:"#a6f0f0", alignItems:"center"}}>
        <div className='text-section d-flex flex-column col-lg-6 col-12 p-3' >

          <div className='Homepagetext'>
            <p className=' fw-bold' style={{ color: "#084949" }}>
              Book Appointment <br /> With Trusted Doctors
            </p>
            <div className='col-md-12'>
              <p className='HomePageText'>
                Our medical professionals are dedicated to providing you with personalized attention.
              </p>
            </div>
          </div>
          <a href="#speciality">
            <button type="button" className="landingBtn text-white">
              Book an appointment 
            </button>
          </a>
        </div>

        <div className='image-section col-lg-6 col-12 p-4 overflow-hidden'>
          <img src={image} className="img-fluid landingImg" alt="Background" />
        </div>
      </div>
      <SpecialityMenu />
      <TopDoctors />
      <BookAppointment/>
    </>
  );
};

export default HomePage;
