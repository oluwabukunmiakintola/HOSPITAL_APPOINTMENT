import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  // Check if there's user data in localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    console.log("Retrieved user data from localStorage:", storedUser);


    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);  // Only set the user if parsing is successful
      } catch (err) {
        console.error('Failed to parse user data from localStorage:', err);
      }
    }
  }, []);

  const login = (userData, token) => {
    if (userData && token) {
      setUser(userData);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      localStorage.setItem('authToken', token);
    }
  };
  

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authToken');  // Remove auth token on logout
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
