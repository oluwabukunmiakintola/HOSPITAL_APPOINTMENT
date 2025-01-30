import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './Component/Context/AppContext.jsx';
import { AuthProvider } from './Component/Context/AuthContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AuthProvider> 
          <App />
        </AuthProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
