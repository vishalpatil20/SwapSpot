import React, { useState } from "react";
import axios from "axios";

function Login({ setSuccessMessage, setErrorMessage }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email: loginEmail,
        password: loginPassword
      });
      // Handle successful login
      setSuccessMessage("Login Successful");
      setErrorMessage(""); // Reset error message if login succeeds
      console.log("Login Successful:", response.data);
    } catch (error) {
      setErrorMessage("Login Failed. Please try again.");
      console.error("Login Failed:", error);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="login">
      <div className="mb-4">
        <label htmlFor="login-email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="login-password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
