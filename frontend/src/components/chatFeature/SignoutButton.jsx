import React from 'react';
import { useNavigate } from "react-router-dom";


const SignoutButton = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    navigate(`/Login`);
    localStorage.removeItem('token');
  };

  return (
    <button onClick={handleSignout}>Sign Out</button>
  );
};

export default SignoutButton;
