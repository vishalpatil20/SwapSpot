import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup({ setSuccessMessage, setErrorMessage }) {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword
      });
      
      if (response.data && response.data.message) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        console.log("Signup Successful");
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setErrorMessage(error.response.data.error || "Signup Failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response was received
        setErrorMessage("No response from server. Please check your connection.");
      } else {
        // Something else went wrong
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage("");
      console.error("Signup Failed:", error);
    }
  };

  return (
    <form onSubmit={handleSignupSubmit} className="signup">
      <div className="mb-4">
        <label htmlFor="signup-name" className="block text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="signup-name"
          placeholder="Name"
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signup-email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="signup-email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signup-password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="signup-password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-[#004AAD] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default Signup;
