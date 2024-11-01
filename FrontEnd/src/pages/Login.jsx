import React, { useContext, useState, useRef, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif';
import SummeryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { fetchUserDetails,fetchUserAddToCart } = useContext(Context);

  // Ref for login section
  const loginSectionRef = useRef(null);

  // Scroll to login section when component mounts
  useEffect(() => {
    if (loginSectionRef.current) {
      loginSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []); // Runs only on initial mount

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummeryApi.SignIn.url, {
      method: SummeryApi.SignIn.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section id="signin" ref={loginSectionRef}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to NakliZon Shop</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <div className="bg-white p-5 w-full max-w-sm mx-auto">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                  <img src={loginIcons} alt="Login Icons" />
                </div>
              </div>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  type={passwordVisible ? 'text' : 'password'}
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">New user?</span>
              <Link to="/signup" className="ml-2 text-sm font-medium text-indigo-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
