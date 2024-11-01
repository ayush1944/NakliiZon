// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [data, setData] = useState({
        email: ""
      });
    
      const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        setData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', data);
      };
    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Forgot Your Password?</h2>
        <p className="text-center text-gray-600">Enter your email address below and we’ll send you instructions to reset your password.</p>
        <form className="space-y-4" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send reset instructions
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link to={"/signin"}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Back to Sign In
          </Link >
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
