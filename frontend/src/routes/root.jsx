import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
  return (
    <div id="detail">
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Root;
