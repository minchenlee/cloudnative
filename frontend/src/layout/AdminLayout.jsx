import { Outlet } from "react-router-dom";
import {useState, useEffect } from 'react'
import AdminHeader from "../components/AdminHeader";
// ScrollToTop is a component that will scroll to top when the route changes
import ScrollToTop from "../utilities/ScrollToTop";
import LoginCard from "../components/cards/LoginCard";
import { Toaster } from 'react-hot-toast';


function AdminLayout() {
  return(
    <>
      <ScrollToTop />
      <AdminHeader />
      <Toaster 
      toastOptions={{
        className: 'text-sm py-1 font-primary font-semibold border-1 shadow-md text-color-primary',
      }}
      />
      <Outlet />
    </>
  )
}

export default AdminLayout
