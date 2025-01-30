import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tlogo from "../../assets/Tlogo.png";
// import Profile from "../../assets/MyProfile.jpg";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={Tlogo}
            alt="Trinity Care Logo"
            className="logo img-fluid"
            style={{ width: "50px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Link className="navbar-brand ms-2" to="/">
            <div className="logo-text">
              <h1 className="mb-0">WinField</h1>
              <h2 className="mb-0">Hospital</h2>
            </div>
          </Link>
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-5">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link to="/doctors" className="nav-link">
                All Doctors
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link to="/contact" className="nav-link">
                Contacts
              </Link>
            </li>
          </ul>

          <div className="ms-auto d-flex align-items-center">
            {user ? (
              <div className="dropdown position-relative">
                <img
                  src={user.profilePicture }
                  alt=""
                  className="profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={handleDropdownToggle}
                />
                <span
                  onClick={handleDropdownToggle}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
                <div>
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
              </div>
            ) : (
              <button
                onClick={() => navigate("/user/signUp")}
                className="btn btn-success mt-2 fw-bold"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
