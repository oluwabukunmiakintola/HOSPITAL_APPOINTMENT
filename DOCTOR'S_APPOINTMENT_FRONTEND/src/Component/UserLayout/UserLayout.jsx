import React from 'react'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {

    const [loading, setLoading] = useState(); 
    useEffect(() => {
        setLoading(true)
    
       setTimeout(()=>{
        setLoading(false)
       },3000)
      }, []);

  return (
    <>
{loading ?(
<div className="loader mx-auto">
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
</div>
    ) :(

      <>
        <Outlet/>
      </>

    )}
    
    </>
  )
}

export default UserLayout
