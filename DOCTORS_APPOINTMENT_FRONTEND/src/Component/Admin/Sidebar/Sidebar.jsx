import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { MdEvent } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/admin/dashboard" className="d-flex align-items-center text-decoration-none ">
            <MdDashboard size={24} />
            <p className="ms-3 mb-0">Dashboard</p>
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/appointments" className="d-flex align-items-center text-decoration-none ">
            <MdEvent size={24} />
            <p className="ms-3 mb-0">Appointments</p>
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/add-doctor" className="d-flex align-items-center text-decoration-none ">
            <FaPlus size={24} />
            <p className="ms-3 mb-0">Add Doctor</p>
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/doctors-list" className="d-flex align-items-center text-decoration-none ">
            <FaList size={24} />
            <p className="ms-3 mb-0">Doctors List</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
