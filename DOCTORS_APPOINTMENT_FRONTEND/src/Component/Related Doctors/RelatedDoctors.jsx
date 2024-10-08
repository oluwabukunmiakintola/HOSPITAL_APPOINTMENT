import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {

const {doctors} = useContext(AppContext)
const navigate = useNavigate()

const [relDoc,setRelDocs] = useState([])

useEffect(() => {
    if (doctors.length > 0 && speciality) {
        const doctorsData = doctors.filter((doc) =>
            doc.speciality.toLowerCase() === speciality.toLowerCase() && doc._id !== docId
          );
          
        console.log('Filtered Doctors:', doctorsData); 
        setRelDocs(doctorsData);
    }
}, [doctors, speciality, docId]);


  return (
    <>
       <div className="container">
      <h2 className="text-center mt-5">Related Doctors</h2>
      <div className="row">
        {relDoc.slice(0,5).map((item, index) => (
          <div
            onClick={() => {
              console.log('Navigating to:', `/appointment/${item._id}`);
              navigate(`/appointment/${item._id}`);scrollTo(0,0)  
            }}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={index}
          >          
            <div
              className="Topdoctors border border-success rounded"
              style={{ overflow: "hidden", cursor: "pointer" }}
            >
              <div className="position-relative" style={{ height: '350px' }}>
                <img
                  className="img-fluid w-100 h-100 object-fit-cover"
                  src={item.image}
                  alt={item.name}
                  style={{background:"#eaefff"}}
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
      <div className="d-flex justify-content-center">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="mt-5 border-0 py-2 px-5 fw-bold text-center mx-auto"
          style={{ borderRadius: "30px", color: "#084949" }}
        >
          More
        </button>
      </div>
    </div>
    
    
    </>
  )
}

export default RelatedDoctors