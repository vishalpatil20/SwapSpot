import React, { useState } from "react";
import axios from "axios";

function LoginSignUpForm() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your login logic here using axios
      setSuccessMessage("Login Successful");
      setErrorMessage("");
      console.log("Login Successful");
    } catch (error) {
      setErrorMessage("Login Failed. Please try again.");
      setSuccessMessage("");
      console.error("Login Failed:", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your signup logic here using axios
      setSuccessMessage("Signup Successful");
      setErrorMessage("");
      console.log("Signup Successful");
    } catch (error) {
      setErrorMessage("Signup Failed. Please try again.");
      setSuccessMessage("");
      console.error("Signup Failed:", error);
    }
  };

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
              className={`mr-2 py-2 px-4 bg-gray-300 text-gray-700 rounded-tl rounded-bl transition-colors duration-300 ease-in-out ${
                activeTab === "login"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200 hover:text-blue-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabChange("signup")}
              className={`py-2 px-4 bg-gray-300 text-gray-700 rounded-tr rounded-br transition-colors duration-300 ease-in-out ${
                activeTab === "signup"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200 hover:text-blue-800"
              }`}
            >
              Signup
            </button>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300">
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="login">
                {activeTab === "login" && (
                  <form onSubmit={handleLoginSubmit} className="login">
                    <div className="mb-4">
                      <label
                        htmlFor="login-email"
                        className="block text-gray-700"
                      >
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
                      <label
                        htmlFor="login-password"
                        className="block text-gray-700"
                      >
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
                )}
              </form>
            )}
            {activeTab === "signup" && (
              <form onSubmit={handleSignupSubmit} className="signup">
                {activeTab === "signup" && (
                  <form onSubmit={handleSignupSubmit} className="signup">
                    <div className="mb-4">
                      <label
                        htmlFor="signup-name"
                        className="block text-gray-700"
                      >
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
                      <label
                        htmlFor="signup-email"
                        className="block text-gray-700"
                      >
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
                      <label
                        htmlFor="signup-password"
                        className="block text-gray-700"
                      >
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
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                )}
              </form>
            )}
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
