import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0) {
      const uniqueSpecialities = new Set();
      const selectedDoctors = [];

      for (const doc of doctors) {
        if (
          uniqueSpecialities.size < 5 &&
          !uniqueSpecialities.has(doc.speciality) &&
          doc._id !== docId
        ) {
          uniqueSpecialities.add(doc.speciality);
          selectedDoctors.push(doc);
        }
      }

      setRelDocs(selectedDoctors);
    }
  }, [doctors, docId]);

  return (
    <div className="container">
      <h2 className="text-center mt-5">Related Doctors</h2>
      <div className="row">
        {relDocs.length > 0 ? (
          relDocs.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={index}
            >
              <div
                className="Topdoctors border border-success rounded"
                style={{ overflow: "hidden", cursor: "pointer" }}
              >
                <div className="position-relative" style={{ height: "350px" }}>
                  <img
                    className="img-fluid w-100 h-100 object-fit-cover"
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
          ))
        ) : (
          <p className="text-center">No related doctors found.</p>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="mt-5 border-0 py-2 px-5 fw-bold text-center mx-auto"
          style={{ borderRadius: "30px", color: "#084949" }}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default RelatedDoctors;
