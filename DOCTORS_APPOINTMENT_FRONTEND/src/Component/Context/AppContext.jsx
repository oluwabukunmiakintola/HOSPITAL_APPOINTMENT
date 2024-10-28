import React, { createContext, useState } from "react"; 
import { doctors } from "../../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [appointments, setAppointments] = useState([]);
    const currencySymbol = "$";

    const cancelAppointment = (id) => {
        setAppointments((prev) => prev.filter(app => app.id !== id));
    };

    const payForAppointment = (id) => {
        // Implement payment logic here
        // Return a success status for demonstration
        return true; 
    };

    const addAppointment = (appointment) => {
        setAppointments(prev => [...prev, appointment]);
    };

    const rescheduleAppointment = (id, newDetails) => {
        setAppointments((prev) => 
            prev.map(app => 
                app.id === id ? { ...app, ...newDetails } : app
            )
        );
    };

    const value = { 
        doctors,  
        currencySymbol, 
        appointments, 
        addAppointment, 
        cancelAppointment, 
        payForAppointment,
        rescheduleAppointment // Add this line
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
