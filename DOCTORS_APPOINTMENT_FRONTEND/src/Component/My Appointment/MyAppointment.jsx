import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";

const MyAppointment = () => {
  const {
    appointments,
    cancelAppointment,
    payForAppointment,
    rescheduleAppointment,
  } = useContext(AppContext);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [newDateTime, setNewDateTime] = useState("");

  const handleCancelRequest = (id) => {
    setSelectedAppointmentId(id);
    setIsCancelModalOpen(true);
  };

  const handleCancel = () => {
    if (selectedAppointmentId) {
      cancelAppointment(selectedAppointmentId);
      toast.success("Appointment canceled successfully.");
      setIsCancelModalOpen(false);
    }
  };

  const handlePay = (id) => {
    const success = payForAppointment(id);
    if (success) {
      toast.success("Payment successful.");
    } else {
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleRescheduleRequest = (id) => {
    setSelectedAppointmentId(id);
    setIsRescheduleModalOpen(true);
  };

  const handleReschedule = () => {
    if (selectedAppointmentId && newDateTime) {
      rescheduleAppointment(selectedAppointmentId, { dateTime: newDateTime });
      toast.success("Appointment rescheduled successfully.");
      setIsRescheduleModalOpen(false);
      setNewDateTime("");
    } else {
      toast.error("Please provide a new date and time.");
    }
  };

  return (
    <div className="py-5 container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
      />
      <p className="mt-5 fs-4 border-bottom pb-3">My Appointments</p>
      <div className="row">
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div key={item.id} className="col-12 mb-4">
              <div className="border p-4 d-flex flex-column flex-md-row align-items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid me-3 mb-3 mb-md-0"
                  style={{
                    maxWidth: "130px",
                    backgroundColor: "#c3d8d8",
                    borderRadius: "5px",
                  }}
                />
                <div className="mt-2 flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">{item.speciality}</p>
                  <p className="mb-0">
                    <span>Date & Time:</span> {item.dateTime}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end mt-3">
                  <button
                    className="btn btn-success mb-2"
                    onClick={() => handlePay(item.id)}
                  >
                    Pay Online
                  </button>
                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => handleCancelRequest(item.id)}
                  >
                    Cancel Appointment
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleRescheduleRequest(item.id)}
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>

      {/* Confirmation Modal for Cancellation */}
      {isCancelModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to cancel this appointment?</h3>
            <button className="btn btn-danger" onClick={handleCancel}>
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsCancelModalOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Modal for Rescheduling */}
      {isRescheduleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reschedule Appointment</h3>
            <input
              type="datetime-local"
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
              required
            />
            <div className="mt-3">
              <button className="btn btn-success" onClick={handleReschedule}>
                Confirm Reschedule
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setIsRescheduleModalOpen(false)}
              >
                 Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default MyAppointment;
