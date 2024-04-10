import React, { useState } from "react";
import axios from "axios";

function Login({ setSuccessMessage, setErrorMessage }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showTestId, setShowTestId] = useState(false);
  const testEmail = "testuser@gmail.com";
  const testPassword = "testpassword";

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

  const handleToggleTestId = () => {
    setShowTestId(!showTestId);
  };

  const handleUseTestId = () => {
    setLoginEmail(testEmail);
    setLoginPassword(testPassword);
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
        <div className="relative">
          <input
            type={showTestId ? "text" : "password"}
            id="login-password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <span
            onClick={handleToggleTestId}
            className="absolute top-0 right-0 m-2 cursor-pointer text-gray-400"
          >
            &#128065;
          </span>
        </div>
      </div>
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-[#004AAD] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
      <div className="mb-2">
        <button
          type="button"
          onClick={handleUseTestId}
          className="bg-gray-200 hover:bg-gray-300 text-[#004AAD] font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Use Test ID
        </button>
      </div>
    </form>
  );
}

export default Login;
