import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader mx-auto">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
