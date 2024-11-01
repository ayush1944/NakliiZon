import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif'
import imageTobase64 from '../helper/imageTobase64';
import SummeryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    profilePic : ""
  });

  const navigate = useNavigate()

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0];
    const imagepic = await imageTobase64(file)
    setData((prev)=>{
        return {
            ...prev ,
            profilePic : imagepic
        }
    })
}

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('name', data.name);
    formData.append('confirmpassword', data.confirmpassword);
  
    if (data.profilePic) {
      const fileInput = document.querySelector('input[type="file"]');
      formData.append('profilePic', fileInput.files[0]); // Append the actual file, not base64
    }
  
    try {
      const dataResponse = await fetch(SummeryApi.SignUp.url, {
        method: SummeryApi.SignUp.method,
        body: formData, // Send FormData instead of JSON
      });
  
      const dataApi = await dataResponse.json();
  
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/signin');
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
   <section id='signup'>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up for NakliZon Shop</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt="Login Icons" />
                    </div>
                        <label >
                            <div className='text-[10px] opacity-80 cursor-pointer font-bold w-full bg-slate-200 py-4 text-center absolute bottom-0'>
                            Upload Photo
                            </div>  
                            <input type="file" className='hidden' onChange={handleUploadPic} />
                        </label>
                </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={handleOnChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmpassword"
                name="confirmpassword"
                value={data.confirmpassword}
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
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account?</span>
          <Link to={"/signin"}
            
            className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link >
        </div>
      </div>
    </div>
   </section>
  );
};

export default SignUp;
