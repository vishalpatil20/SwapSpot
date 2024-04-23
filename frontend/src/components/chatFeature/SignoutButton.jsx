import React from 'react';

const SignoutButton = () => {
  const handleSignout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <button onClick={handleSignout}>Sign Out</button>
  );
};

export default SignoutButton;
