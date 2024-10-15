import React from 'react';
import contactImg from "../../assets/contact_image.svg";

const Contact = () => {
  return (
    <div className='my-3 container'>
      <div className='text-center pt-2'>
        <p className='mt-5 fw-bold' style={{ color: "#008080" }}>
          CONTACT <span>US</span>
        </p>
      </div>

      <div className='row align-items-center'>
        <div className='col-md-6'>
          <img src={contactImg} alt="Contact" className='img-fluid w-75' />
        </div>
        <div className='col-md-6'>
          <p className='fw-bold'>OUR OFFICE</p>
          <p>54 William street <br />Ogbomoso, Oyo state, Nigeria</p>
          <p>Tel: (234) 903-551-7399 <br /> Email: trinitycare@gmail.com</p>
          <p className='fw-bold'>Careers at TRINITY CARE</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='py-2 custom-hover-bg'>Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
