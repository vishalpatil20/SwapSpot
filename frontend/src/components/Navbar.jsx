import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/dark_logo.png'
import Home from './Home';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-blue font-bold text-xl">
            <img src= {logo} alt="logo" className="h-14 w-17"/>
        </div>
        <div className="flex space-x-4">
          <Link to="/Home" className="text-white">Home</Link>
          <Link to="/Aboutme" className="text-white">About</Link>
          <Link to="/services" className="text-white">Services</Link>
          <Link to="/contact" className="text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
