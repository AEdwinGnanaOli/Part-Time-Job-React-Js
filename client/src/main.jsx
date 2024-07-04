import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./Context/auth.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './Context/Cart.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);