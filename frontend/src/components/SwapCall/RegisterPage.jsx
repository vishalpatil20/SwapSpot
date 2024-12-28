import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/form/register', formData);
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-prim-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-prim">
              Username/Email
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="janesmith"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-prim">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-prim">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="last-name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-prim">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-prim">
              Country
            </label>
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-prim">
              Street Address
            </label>
            <input
              type="text"
              name="streetAddress"
              id="street-address"
              value={formData.streetAddress}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-prim">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-prim">
              State / Province
            </label>
            <input
              type="text"
              name="region"
              id="region"
              value={formData.region}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-prim">
              ZIP / Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postal-code"
              value={formData.postalCode}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="reset"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
