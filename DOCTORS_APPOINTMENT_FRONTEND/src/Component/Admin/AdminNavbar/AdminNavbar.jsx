import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Tlogo from "../../../assets/Tlogo.png";

const AdminNavbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate("/admin/login"); 
  };

  return (
    <>
    <div className='container-fluid d-flex align-items-center bg-light justify-content-between'>
      <div className='d-flex align-items-center'>
        <img src={Tlogo} alt="Winfield logo" style={{ width: '50px', cursor: 'pointer' }} />
        
        <Link className="navbar-brand ms-3" to="#">
          <div className="logo-text d-flex flex-column mt-2">
            <h1 className="mb-0">WinField Hospital</h1>
            <p className='border rounded-pill text-center mt-2' style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Admin</p>
          </div>
        </Link>
      </div>

      <button
        className='ms-auto rounded-pill border text-white px-3 py-2'
        style={{ background: "#167474" }}
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
    </>
  );
    
};

export default AdminNavbar;
