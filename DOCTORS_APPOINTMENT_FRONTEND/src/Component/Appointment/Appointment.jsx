import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import Icon from "../../assets/verified_icon.png";
import info from "../../assets/info_icon.png";
import RelatedDoctors from '../Related Doctors/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek=["SUN", "MON","TUE","WED","THUR","FRI","SAT"]
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setdocSlots]=useState([])
  const [slotIndex, setSlotIndex]=useState(0)
  const [slotTime, setSlotTime]=useState("")


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const getAvailableSlots = async()=>{
    setdocSlots([])

    let today =new Date()

    for(let i =0 ; i < 7; i++){
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)
      
      // setting end time of the date with index
      let endTime =new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      // settings hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 :10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 :0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
        
      let timeSlots =[]
      while (currentDate < endTime){
      let formattedTime = currentDate.toLocaleDateString([], {hour:"2-digit", minute:"2-digit"})
      // add slot to array
      timeSlots.push({
        datetime: new Date(currentDate),
        time:formattedTime
      })

      // increment current time by 30 minutes
      currentDate.setMinutes(currentDate.getMinutes() + 30)
     }

     setdocSlots(prev =>([...prev, timeSlots]))
    }

  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])

useEffect(()=>{
  console.log(docSlots);
  
},[docSlots])

  return docInfo && (
    <div className="container">
      <div className="row mt-5 py-5">
        <div className="col-12 col-md-5">
          <img className="img-fluid w-50 rounded" src={docInfo.image} alt="" style={{ background: "#a6f0f0" }} />
        </div>

        <div className="col-12 col-md-7 border success rounded p-3">
          <p className="fs-4">
            {docInfo.name} <img className="icon" src={Icon} alt="Verified" />
          </p>
          <div className="d-flex gap-2 align-items-center">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="btn btn-outline-success btn-sm">{docInfo.experience}</button>
          </div>

          <div>
            <p className='d-flex gap-1 '>About <img className="icon" src={info} alt="Info" /></p>
            <p>{docInfo.about}</p>
          </div>
          <p>
            Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/* Booking slots */}
      <div>
        <p className='fw-bold fs-5'>Booking slots</p>
        <div className='d-flex gap-3 flex-wrap mt-3'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center px-4 rounded cursor-pointer ${slotIndex === index ? 'bg-success text-white' : 'border success'}`}
              key={index}
              style={{ cursor: 'pointer' }} 
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='d-flex w-100 flex-wrap gap-3 mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index)=>(
          <p onClick={()=>setSlotTime(item.time)} className={`px-2 py-2 rounded ${item.time === slotTime ? 'bg-success' : 'border border-success'}`}style={{ cursor: 'pointer' }} 
          key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-success text-white  rounded border px-4 py-2'>Book an Apppointment</button>
      </div>
      {/* related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

    </div>
  );
};

export default Appointment;
