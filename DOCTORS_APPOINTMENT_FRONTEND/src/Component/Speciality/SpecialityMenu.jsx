import React from "react";
import { Link } from "react-router-dom";
import { SpecialityData } from "../../assets/assets";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="container mt-5">
      <h1 className="text-center">Find by Speciality</h1>
      <p className="text-center">
        Simply browse through our extensive list of trusted doctors, schedule{" "}
        <br />
        your appointment hassle-free.
      </p>

      <div className="row specialities-container">
        {SpecialityData.map((item, index) => (
          <div className="col-6 col-md-4 col-lg-2 mb-4" key={index}>
            <Link
              onClick={() => scrollTo(0,0)}
              to={`/doctors/${item.speciality}`}
              className="speciality-item text-center"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="img-fluid"
                style={{ maxWidth: "60px", height: "auto" }}
              />
              <p>{item.speciality}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
