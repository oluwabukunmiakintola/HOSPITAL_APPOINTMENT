import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/MyProfile.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState(true);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
const handleLogout = () => {
  setToken(false);
  setDropdownOpen(false);
  navigate("/"); 
};


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        
        <Link className="navbar-brand" to="#">
          <div onClick={() => navigate("/")} className="trinity-knot img-fluid"></div>
          <div className="logo-text">
            <h1 className="mb-0 h5 h4 h3 h2">Trinity Care</h1>
            <h2 className="mb-0 h6 h5 h4 h3">Hospital</h2>
          </div>
        </Link>
        <div className="d-flex align-items-center">
          {token ? (
            <div className="dropdown position-relative">
              <img
                src={profile}
                alt="Profile"
                className="profile"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                onClick={handleDropdownToggle}
              />
              <span
                onClick={handleDropdownToggle}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  dropdownOpen ? "show" : ""
                }`}
                style={{ border: "none", position: "absolute", zIndex: 1000 }}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/my-profile"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/my-appointment"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Appointment
                  </Link>
                </li>
                <li>
                  <p onClick={handleLogout} className="dropdown-item">
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => navigate("/user/signUp")}
              className="btn btn-success mt-2 fw-bold"
            >
              Create Account
            </button>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto">
            <ul className="navbar-nav">
              <li className="nav-item mx-2">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/doctors" className="nav-link">
                  All Doctors
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/contact" className="nav-link">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
