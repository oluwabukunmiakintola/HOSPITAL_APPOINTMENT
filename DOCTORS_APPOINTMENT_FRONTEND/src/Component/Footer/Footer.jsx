import React from 'react';

const Footer = () => {
  return (
    <div className="bg-light text-dark py-5 overflow-hidden mt-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-lg-4 col-md-6 mb-4 px-5">
          <div className="logo-text">
            <h1 className="mb-0">WinField</h1>
            <h2 className="mb-0">Hospital</h2>
            <p className='mt-2'>At WinField Hospital, we prioritize your well-being. Our dedicated team is here to provide exceptional care and support.</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="col-lg-4 col-md-6 mb-4 px-5">
          <h5 style={{ color: "#0e4747" }}>Company </h5>
          <ul className="list-unstyled " style={{cursor:"pointer"}} >
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="col-lg-4 col-md-6 mb-4 px-5">
          <h5 style={{ color: "#0e4747" }}>Get in Touch</h5>
          <ul className="list-unstyled"style={{cursor:"pointer"}}>
            <li>+234-355-173-99</li>
            <li>WinField@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4">
        <hr />
        <p className="mb-0 fw-bold" style={{ color: "#0e4747" }}>Copyright &copy; 2024 WinField Hospital - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
