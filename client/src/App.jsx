import React from "react";
import { Route, Routes } from "react-router-dom"
import './App.css'
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Index from './Pages/Index';
import UserHome from "./Pages/UserHome"
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VendorProductFullDedails from "./Pages/VendorProductFullDedails";
// import ProductUpdate from "./Pages/VendorProductUpdate";
import UserCard from "./Pages/UserCard";
import UserDetails from "./Pages/admin/UserDetails";
import VendorProductDetails from "./Pages/admin/VendorProductDetails";
import VendorDetails from "./Pages/admin/VendorDetails";
import AdminHome from "./Pages/admin/AdminHome";
import AdminProductUpdate from "./Pages/admin/AdminProductUpdate";
// import VendorUpdate from "./Pages/VendorUpdate";
import AdminVendorUpdate from "./Pages/admin/AdminVendorUpdate";
import AdminUserUpdate from "./Pages/admin/AdminUserUpdate";
import UserUpdate from "./Pages/UserUpdate";
import LoginUserData from "./Pages/admin/LoginUserData";
import LoginVendorData from "./Pages/admin/LoginVendorData";
import Footer from "./Components/Footer";
import './App.css'
import UserSignIn from "./Pages/admin/UserSignIn";
import VendorProductSignIn from "./Pages/admin/VendorProductSignIn";
import VendorSignInProduct from "./Pages/admin/VendorSignInProduct";
import ContectUs from "./Pages/ContectUs";
import AboutUs from "./Pages/AboutUs";
import Dashboard from "./Pages/admin/Dashboard";
import Pagenotfound from './Pages/Pagenotfound'
import AdminIndex from "./Pages/admin/Index";

function App() {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
  const getCharacter = (index) => {
    return hexCharacters[index]
  }
  const randomColor = () => {
    let hexColorRep = '#'
    for (let i = 0; i < 6; i++) {
      const randomCharacters = Math.floor(Math.random() * hexCharacters.length)
      hexColorRep += getCharacter(randomCharacters)
    }
    return hexColorRep
  }
  return (
    <>
   
        <Routes>
          {/* <Route path='/home' element={<Home/>}/> */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userhome" element={<UserHome colors={randomColor()} />} />
          <Route path='/usercart' element={<UserCard />} />
          <Route path="/productfulldetail/:id/:token" element={<VendorProductFullDedails />} />
          <Route path='/login' element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/adminhome" element={<AdminHome colors={randomColor()} />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/vendorproduct" element={<VendorProductDetails />} />
          <Route path="/vendordetails" element={<VendorDetails />} />
          <Route path="/adminproductupdate" element={<AdminProductUpdate />} />
          <Route path="/user/update" element={<UserUpdate />} />
          <Route path="/admin/vendor/update" element={<AdminVendorUpdate />} />
          <Route path="/admin/user/update" element={<AdminUserUpdate />} />
          <Route path="/userlogindata" element={<LoginUserData />} />
          <Route path="/vendorlogindata" element={<LoginVendorData />} />
          <Route path="/usersign" element={<UserSignIn />} />
          <Route path="/vendorproductsign/:vendorId" element={<VendorProductSignIn />} />
          <Route path="/vendorsignproduct" element={<VendorSignInProduct/>}/>
          <Route path="footer" element={<Footer />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/admin/dashboard" element={<Dashboard  colors={randomColor()} />} />
          <Route path="/admin/layout" element={<AdminIndex colors={randomColor()} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contect-us" element={<ContectUs />} />
        </Routes>
    </>
  )
}

export default App
