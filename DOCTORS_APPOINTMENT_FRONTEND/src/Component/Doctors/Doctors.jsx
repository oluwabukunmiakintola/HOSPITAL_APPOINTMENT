import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
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

  return (
    <div>
      <p className="text-center mt-5 py-4">
        Browse through the doctors' specialties.
      </p>
      <div className="container d-flex flex-column flex-md-row gap-4">
        <div
          className="d-flex flex-column mt-3 px-3"
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
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className="mb-3 gap-1 text-center border border-success rounded py-2 w-100"
              style={{ width: "200px" }} 
            >
              {spec}
            </p>
          ))}
        </div>
        <div className="row">
          {filterDoc.map((item) => (
            <div
              onClick={() => navigate(`appointment/${item._id}`)}
              className="col-12 col-md-12 col-lg-6 mb-4"
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
