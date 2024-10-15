import React from "react";
import image from "../../assets/banner.png";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate=useNavigate()
  return (
    <>
      <div className=" container d-flex justify-content-center mt-3 "  style={{
            background: "#a6f0f0",
            height: "330px",

          }}>
          <div className=" flex-1  col-lg-8 col-12 py-5 px-5">
            <div className="">
              <p className="fw-bold fs-1" style={{ color: "#0e4747" }}>
                Book Appointment 
              </p>
              <p className="fw-bold fs-1" style={{ color: "#0e4747" }}>
                with 50+ Trusted Doctors
              </p>
            </div>
            <div className="mt-3">
              <button onClick={()=>{navigate("/user/signIn"); scrollTo(0,0)}} className="landingBtn text-white">Create Account</button>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-3 mb-5  d-none d-lg-block overflow-hidden">
            <img 
              src={image} 
              className="bookImage w-25"
              alt="Background" 
              style={{top:"2500px", position:"absolute"}}
            />
          </div>
      </div>
    </>
  );
};

export default BookAppointment;
