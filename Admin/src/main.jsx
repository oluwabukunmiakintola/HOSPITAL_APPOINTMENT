import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './Component/Context/AppContext.jsx'
import AdminContextProvider from './Component/Context/AdminContext.jsx'
import DoctorContextProvider from './Component/Context/DoctorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
    <AppContextProvider>
     <App />
  </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
    </BrowserRouter>  </StrictMode>,
)
