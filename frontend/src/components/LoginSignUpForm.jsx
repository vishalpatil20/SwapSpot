import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Intro from './Intro'


function LoginSignUpForm() {
  const [activeTab, setActiveTab] = useState("login");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div>
            <span className="bg-[#004AAD] font-mono text-5xl">Welcome To <span className="text-white">SwapSpot</span></span> 
            <h2 className="py-2">If dont want to register use <span className="font-bold">TestId</span> in login &#x1F609;</h2>
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => handleTabChange("login")}
              className={`mr-2 py-2 px-4 bg-[#004AAD] text-gray-900 rounded-tl rounded-bl transition-colors duration-300 ease-in-out ${
                activeTab === "login"
                  ? "bg-[#004AAD] text-white"
                  : "hover:bg-black hover:text-blue-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabChange("signup")}
              className={`py-2 px-4 bg-[#004AAD] text-gray-900 rounded-tr rounded-br transition-colors duration-300 ease-in-out ${
                activeTab === "signup"
                  ? "bg-[#004AAD] text-white"
                  : "hover:bg-black hover:text-blue-800"
              }`}
            >
              Signup
            </button>
          </div>
          <div className="bg-white p-6 rounded border border-gray-300">
            {activeTab === "login" && <Login setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />}
            {activeTab === "signup" && <Signup setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />}
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="success-message text-green-600 mt-4 rounded-tr">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-message text-red-600 mt-4 rounded-tr">{errorMessage}</div>
      )}
      <Intro/>
    </div>
  );
}

export default LoginSignUpForm;
