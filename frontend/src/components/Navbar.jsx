import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/dark_logo.png';

const Navbar = () => {
  return (
    <nav className="bg-black p-2 md:p-1 flex justify-center items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#004AAD] font-bold text-xl">
        <Link to="/Home">
        <img src={logo} alt="SwapSpot" className="h-13 w-14" />
        </Link>
        </div>
        <div className="flex space-x-7 font-mono">
        <Link to="/Home" className="text-[#004AAD] hover:text-white">Home</Link>
        <Link to="/Aboutme" className="text-[#004AAD] hover:text-white">About</Link>
        <Link to="/services" className="text-[#004AAD] hover:text-white">Services</Link>
        <Link to="/Login" className="text-[#004AAD]   hover:text-white">Login/Sign-up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
