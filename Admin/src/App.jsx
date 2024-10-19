import { useContext } from 'react';
import './App.css'
import AdminLogin from './Component/Admin/AdminLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Component/Context/AdminContext';
import Navbar from './Component/Navbar/Navbar';

function App() {
  const{atoken}= useContext(AdminContext)

  return atoken ? (
    <>
    <ToastContainer/>
    <div className='bg-success'></div>
    <Navbar/>
     </>
  ):(
    <>
     <AdminLogin/>
     <ToastContainer/>
    </>
  )
}

export default App
