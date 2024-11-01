import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignInSignUpButton = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  // Toggle between "Sign In" and "Sign Up" every 2 seconds when not hovered
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showOptions) {
        setIsSignIn((prev) => !prev);
      }
    }, 2000);

    return () => clearInterval(interval); // Cleanup
  }, [showOptions]);

  return (
    <div className="relative inline-block h- w-36">
      {/* Main toggle button */}
      <Link
        to={isSignIn ? "signin" : "signup"}
        className={`
          px-10 py-2 text-white rounded-full transition duration-500 ease-in-out
          ${isSignIn ? 'bg-orange-600 hover:bg-orange-800' : 'bg-teal-500 hover:bg-teal-700'}
        `}
        style={{ width: '160px', textAlign: 'center' }} // Fixed width
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <span className="transition-opacity duration-500">
          {isSignIn ? 'Sign in' : 'Sign Up'}
        </span>
      </Link>

      {/* Horizontal pop-up buttons */}
      {showOptions && (
        <div
          className="absolute flex space-x-4 mt-2 w-full justify-center"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          {/* Sign In Button */}
          <Link
            to="signin"
            className="px-10 py-2 text-white bg-orange-600 hover:bg-orange-800 rounded-full transition duration-500 text-nowrap ease-in-out"
            style={{ width: '160px', textAlign: 'center' }} // Same style and size as main button
          >
            Sign In
          </Link>

          {/* Sign Up Button */}
          <Link
            to="signup"
            className="px-10 py-2 text-white text-nowrap bg-teal-500 hover:bg-teal-700 rounded-full transition duration-500 ease-in-out"
            style={{ width: '160px', textAlign: 'center' }} // Same style and size as main button
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignInSignUpButton;
