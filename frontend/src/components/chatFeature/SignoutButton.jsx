import React from 'react';
import { useNavigate } from "react-router-dom";

const SignoutButton = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Navigate to login page
    navigate(`/Login`);
  };

  return (
    <button onClick={handleSignout}>Sign Out</button>
  );
};

export default SignoutButton;
