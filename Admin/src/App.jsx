import './App.css'
import AdminLogin from './Component/Admin/AdminLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
     <AdminLogin/>
     <ToastContainer/>
     </>
  )
}

export default App
