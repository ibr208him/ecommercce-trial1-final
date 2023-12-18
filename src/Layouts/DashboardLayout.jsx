import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../Components/Dashboard/dashboardFixedComponents/Navbar/Navbar';
import Footer from './../Components/Dashboard/dashboardFixedComponents/Footer/Footer';

export default function DashboardLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}
