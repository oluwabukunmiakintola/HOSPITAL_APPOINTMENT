import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const appointments = [
        {
            date: '2024-09-25',
            time: '10:00 AM',
            doctor: 'Dr. Smith',
            specialty: 'Cardiologist',
        },
    ];

    return (
        <div className="dashboard">
            <header>
                <div className="logo">Hospital Logo</div>
                <div className="user-profile">Welcome, User ▼</div>
            </header>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Book Appointment</a></li>
                    <li><a href="#">View Appointments</a></li>
                    <li><a href="#">Medical Records</a></li>
                    <li><a href="#">Notifications</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </nav>
            <main>
                <h1>Welcome, User!</h1>
                <div className="current-time">
                    <p>Current Date: {currentTime.toLocaleDateString()}</p>
                    <p>Current Time: {currentTime.toLocaleTimeString()}</p>
                </div>
                <section className="appointments">
                    <h2>Upcoming Appointments</h2>
                    {appointments.map((appointment, index) => (
                        <div className="appointment" key={index}>
                            <p>Date: {appointment.date}</p>
                            <p>Time: {appointment.time}</p>
                            <p>Doctor: {appointment.doctor} ({appointment.specialty})</p>
                            <button>Cancel</button>
                            <button>Reschedule</button>
                        </div>
                    ))}
                </section>
                <section className="health-updates">
                    <h2>Health Updates</h2>
                    <p>Recent Lab Result: Normal</p>
                    <p>Health Tip: Stay hydrated!</p>
                </section>
                <section className="quick-links">
                    <h2>Quick Links</h2>
                    <button>Schedule a Follow-up</button>
                    <button>Access Prescriptions</button>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Hospital Name | <a href="#">Privacy Policy</a></p>
            </footer>
        </div>
    );
};

export default Dashboard;
