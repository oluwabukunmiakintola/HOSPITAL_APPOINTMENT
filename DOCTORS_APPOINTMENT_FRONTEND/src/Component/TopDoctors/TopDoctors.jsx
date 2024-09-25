import React from 'react';
import { doctors } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {

  const navigate=useNavigate()
  
  return (
    <div className='container'>
      <h1 className='text-center mt-5'>Top Doctors to Book</h1>
      <p className='text-center'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='row'>
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={()=>navigate(`appointment/${item._id}`)} className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={index}>
            <div className='Topdoctors border border-success rounded' style={{ overflow: "hidden", cursor: "pointer" }}>
              <img className='img-fluid' src={item.image} alt={item.name} />
              <div className='p-2'>
                <div className='d-flex gap-2 text-success fw-bold'>
                  <p className='bg-success rounded' style={{ width: '8px', height: '0.5rem' }}></p>
                  <p>Available</p>
                </div>
                <p className='fw-bold'>{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-5 border-0 py-2 px-5 fw-bold' style={{ borderRadius: "30px", color: "#084949", backgroundColor: "transparent" }}>
        More
      </button>
    </div>
  );
}

export default TopDoctors;
