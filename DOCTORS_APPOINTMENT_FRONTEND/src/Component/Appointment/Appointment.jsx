import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Icon from "../../assets/verified_icon.png";
import info from "../../assets/info_icon.png";
import RelatedDoctors from "../Related Doctors/RelatedDoctors";
import Calendar from "react-calendar";
import { ToastContainer, toast } from "react-toastify";
import { ImAlarm } from "react-icons/im";
import { BiSolidCalendar } from "react-icons/bi";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, addAppointment } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [date, setDate] = useState(new Date());
  const [booked, setBooked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  const getAvailableSlots = (selectedDate) => {
    const slots = [];
    let currentDate = new Date(selectedDate);
    let endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    currentDate.setHours(10, 0, 0, 0);

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      slots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
      });
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }
    setDocSlots(slots);
  };

  useEffect(() => {
    fetchDocInfo();
    getAvailableSlots(date);
  }, [doctors, docId]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setSelectedSlot(null);
    getAvailableSlots(selectedDate);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = () => {
    if (selectedSlot) {
      const appointmentDetails = {
        id: new Date().getTime(),
        name: docInfo.name,
        speciality: docInfo.speciality,
        dateTime: `${date.toDateString()} | ${selectedSlot.time}`,
        image: docInfo.image,
      };
      addAppointment(appointmentDetails);
      setBooked(true);
      setTimeout(() => {
        toast.success(
          `Booking confirmed for ${
            selectedSlot.time
          } on ${date.toDateString()} with ${docInfo.name}`
        );
        setTimeout(() => {
          navigate("/my-appointment");
        }, 2000);
      });
    } else {
      toast.error("Please select a time slot.");
    }
  };

  const handleCancel = () => {
    setBooked(false);
    setSelectedSlot(null);
    toast.info("Booking cancelled.");
  };

  return (
    docInfo && (
      <div className="container">
        <ToastContainer
          className="custom-toast"
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover
        />
        <div className="row mt-5 py-5">
          <div className="col-12 col-md-5">
            <img
              className="img-fluid w-50 rounded"
              src={docInfo.image}
              alt=""
              style={{ background: "#a6f0f0" }}
            />
          </div>

          <div className="col-12 col-md-7 border success rounded p-3">
            <p className="fs-4">
              {docInfo.name} <img className="icon" src={Icon} alt="Verified" />
            </p>
            <div className="d-flex gap-2 align-items-center">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="btn btn-outline-success btn-sm">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="d-flex gap-1">
                About <img className="icon" src={info} alt="Info" />
              </p>
              <p>{docInfo.about}</p>
            </div>
            <p>
              Appointment fee:{" "}
              <span>
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="d-flex flex-wrap mt-4">
          <div className="calendar-container me-4">
            <h3 className="mb-5">Book Appointment</h3>
            <h6>
              <BiSolidCalendar className="text-success" /> Select Date
            </h6>
            <Calendar onChange={handleDateChange} value={date} />
          </div>
          <div className="time-slots-container">
            <h6 className="mt-5 pt-4">
              <ImAlarm className="text-success" /> Select a Time Slot
            </h6>
            <div className="time-slot-day">
              <div className="time-slot-box">
                <div className="d-flex flex-wrap">
                  {docSlots.map((slot, index) => (
                    <div key={index} className="time-slot-container">
                      <button
                        onClick={() => handleSlotSelect(slot)}
                        className={`btn ${
                          selectedSlot === slot
                            ? "btn-success"
                            : "btn-outline-secondary"
                        } mx-2 my-1 rounded-pill`}
                        style={{
                          minWidth: "100px",
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        {slot.time}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {booked ? (
              <div>
                <button onClick={handleCancel} className="btn btn-danger mt-3">
                  Cancel Booking
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleSubmit} className="btn btn-success mt-3">
                  Submit Booking
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
