import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
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
        <div className="loader-container">
          <div className="loader mx-auto">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
          </div>
        </div>
      ) : (
        <>
          {/* <Navbar /> */}
          <Outlet />
          {/* <Footer /> */}
        </>
      )}
    </>
  );
};

export default AdminLayout;
