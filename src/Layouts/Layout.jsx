import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../Components/Web/webFixedComponents/Navbar/Navbar';
import Footer from './../Components/Web/webFixedComponents/Footer/Footer';

export default function Layout( ) {
  return (
    <>
   
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>

  )
}
