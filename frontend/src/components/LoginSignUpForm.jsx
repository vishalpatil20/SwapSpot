import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

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
          <div className="flex justify-center mb-4">
            <button
              onClick={() => handleTabChange("login")}
              className={`mr-2 py-2 px-4 bg-gray-300 text-gray-900 rounded-tl rounded-bl transition-colors duration-300 ease-in-out ${
                activeTab === "login"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200 hover:text-blue-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabChange("signup")}
              className={`py-2 px-4 bg-gray-300 text-gray-900 rounded-tr rounded-br transition-colors duration-300 ease-in-out ${
                activeTab === "signup"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200 hover:text-blue-800"
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
        <div className="success-message text-green-600 mt-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-message text-red-600 mt-4">{errorMessage}</div>
      )}
    </div>
  );
}

export default LoginSignUpForm;
