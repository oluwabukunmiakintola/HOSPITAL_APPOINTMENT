import React, { useState } from "react";
import profile from "../../assets/MyProfile.jpg";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Victory",
    image: profile,
    email: "victory12@gmail.com",
    phone: "+234 0802 0202 47",
    address: {
      line1: "No 4 William street",
      line2: "Church road, Ogbomoso",
    },
    gender: "Female",
    dob: "2000-06-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  return (
    <div className="container my-5">
      <img
        src={userData.image}
        alt={userData.name}
        className="img-fluid rounded-circle mt-4"
        style={{ width: "150px", height: "150px" }}
      />
      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="form-control mt-3"
          // style={{ width: "200px" }} 
        />
      ) : (
        <h2>{userData.name}</h2>
      )}
      <hr />
      <div>
        <p className="fw-bold">CONTACT INFORMATION</p>
        <p  >Email id: <span className="text-primary">{userData.email}</span></p>
        <p>
          Phone: {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="form-control"
              // style={{ width: "200px" }}
            />
          ) : (
            userData.phone
          )}
        </p>
        <p>
          Address: {isEdit ? (
            <>
              <input
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                value={userData.address.line1}
                type="text"
                className="form-control mb-2"
                placeholder="Address Line 1"
              />
              <input
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                value={userData.address.line2}
                type="text"
                className="form-control mb-2"
                placeholder="Address Line 2"
              />
            </>
          ) : (
            <>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </>
          )}
        </p>
      </div>
      <div>
        <p className="fw-bold">BASIC INFORMATION</p>
        <p>
          Gender: {isEdit ? (
            <select
              onChange={(e) => handleChange("gender", e.target.value)}
              value={userData.gender}
              className="form-select mb-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            userData.gender
          )}
        </p>
        <p>
          Birthday: {isEdit ? (
            <input
              onChange={(e) => handleChange("dob", e.target.value)}
              value={userData.dob}
              type="date"
              className="form-control"
            />
          ) : (
            userData.dob
          )}
        </p>
      </div>
      <div>
        <button onClick={() => setIsEdit(!isEdit)} className="border rounded py-2 px-4 rounded-pill text-white"
          style={{backgroundColor:" #067373"}}>
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
