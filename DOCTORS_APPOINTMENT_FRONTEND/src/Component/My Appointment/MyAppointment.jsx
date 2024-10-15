import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom'; 

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState(doctors.slice(0, 3)); 
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [rescheduleMessage, setRescheduleMessage] = useState(''); 

  const navigate = useNavigate(); 

  const handlePay = (appointmentId) => {
    console.log(`Payment initiated for appointment ${appointmentId}`);
  };

  const handleCancel = (appointmentId) => {
    setShowConfirmModal(true);
    setAppointmentToCancel(appointmentId);
  };

  const confirmCancel = () => {
    setAppointments(prevAppointments => {
      const updatedAppointments = prevAppointments.filter(app => app.id !== appointmentToCancel);
      navigate('/'); 
      return updatedAppointments;
    });
    console.log(`Appointment ${appointmentToCancel} cancelled`);
    setShowConfirmModal(false);
    setAppointmentToCancel(null);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(''); 
  };

  const confirmReschedule = () => {
    setAppointments(prevAppointments =>
      prevAppointments.map(app => 
        app.id === selectedAppointment.id 
          ? { ...app, dateTime: newDate } 
          : app
      )
    );
    setRescheduleMessage(`Appointment with ${selectedAppointment.name} has been rescheduled to ${newDate}`);
    // console.log(`Appointment ${selectedAppointment.id} rescheduled to ${newDate}`);
    setSelectedAppointment(null);
    setNewDate('');
  };

  return (
    <div className='py-5 container'>
      <p className='mt-5 fs-4 border-bottom pb-3'>My Appointments</p>

      {/* Display Reschedule Message */}
      {rescheduleMessage && <div className="alert alert-success">{rescheduleMessage}</div>}

      <div className="row">
        {appointments.map((item) => (
          <div key={item.id} className="col-12 mb-4">
            <div className="border p-4">
              <div className="d-flex align-items-start">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className='img-fluid me-3'  
                  style={{ maxWidth: '130px', backgroundColor: "#c3d8d8", borderRadius: "5px" }} 
                />
                <div className='mt-2'>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1">{item.speciality}</p>
                  <p className="mb-1">Address:</p>
                  <p className="mb-1">{item.address?.line1 || '17th Cross, Richmond'}</p>
                  <p className="mb-1">{item.address?.line2 || 'Circle, Ring Road, London'}</p>
                  <p className="mb-0">
                    <span>Date & Time:</span> {item.dateTime || '12, October, 2024 | 10:00 PM'}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button 
                  className="btn btn-success me-2" 
                  onClick={() => handlePay(item.id)}
                >
                  Pay Online
                </button>
                <button 
                  className="btn btn-danger me-2" 
                  onClick={() => handleCancel(item.id)}
                >
                  Cancel Appointment
                </button>
                <button 
                  className="btn btn-warning" 
                  onClick={() => handleReschedule(item)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal for Cancellation */}
      {showConfirmModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button type="button" className="close" onClick={() => setShowConfirmModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this appointment?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>No</button>
                <button type="button" className="btn btn-danger" onClick={confirmCancel}>Yes, Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {selectedAppointment && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reschedule Appointment for {selectedAppointment.name}</h5>
                <button type="button" className="close" onClick={() => setSelectedAppointment(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor="newDate" className="form-label">Select New Date & Time</label>
                <input 
                  type="datetime-local" 
                  className="form-control" 
                  id="newDate" 
                  value={newDate} 
                  onChange={(e) => setNewDate(e.target.value)} 
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedAppointment(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={confirmReschedule}>Confirm Reschedule</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAppointment;
