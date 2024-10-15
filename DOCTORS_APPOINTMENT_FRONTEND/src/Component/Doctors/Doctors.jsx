import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const handleSpecialtyClick = (spec) => {
    if (speciality === spec) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  return (
    <div>
      <p className="text-center mt-5 py-4">
        Browse through the doctors' specialties.
      </p>
      <div className="container d-flex flex-column flex-md-row gap-4">
        {/* Show filter button only on mobile */}
        <button
          className={`py-1 px-3 border rounded-pill ${showFilter ? "bg-success text-white" : ""} d-md-none`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        {/* Filter options - visible only on mobile */}
        <div
          className={`flex-column mt-3 px-3 ${showFilter ? 'd-flex' : 'd-none'} d-md-none`}
          style={{ cursor: "pointer" }}
        >
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => handleSpecialtyClick(spec)}
              className="mb-3 gap-1 text-center border border-success rounded py-2 w-100"
              style={{ width: "200px" }} 
            >
              {spec}
            </p>
          ))}
          <p
            onClick={() => navigate("/doctors")}
            className="mb-3 text-center border border-danger rounded py-2 w-100 text-danger"
            style={{ width: "200px", cursor: "pointer" }}
          >
            Clear Filters
          </p>
        </div>  
        {/* Specialty options visible on all screens */}
        <div className="d-none d-md-flex flex-column gap-3">
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => handleSpecialtyClick(spec)}
              className={`text-center border border-success rounded py-2 ${speciality === spec ? 'bg-success text-white' : ''}`}
              style={{ cursor: "pointer", width: "200px" }}
            >
              {spec}
            </p>
          ))}
        </div>
        {/* Doctors List */}
        <div className="row">
          {filterDoc.map((item) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);  
              }}
              className="col-12 col-md-6 mb-4"
              key={item._id}
            >
              <div
                className="Topdoctors border border-success rounded"
                style={{ cursor: "pointer", marginTop: "20px" }}
              >
                <div className="position-relative" style={{ height: "250px" }}>
                  <img
                    className="w-100 h-100 object-fit-cover"
                    src={item.image}
                    alt={item.name}
                    style={{ background: "#eaefff" }}
                  />
                </div>
                <div className="p-2">
                  <div className="d-flex gap-2 text-success fw-bold">
                    <p
                      className="bg-success rounded mt-2"
                      style={{ width: "8px", height: "0.5rem" }}
                    ></p>
                    <p>Available</p>
                  </div>
                  <p className="fw-bold">{item.name}</p>
                  <p>{item.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
