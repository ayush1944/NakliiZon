import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate imported here
import { IoIosSettings, IoIosCart, IoIosHeart, IoIosLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SummeryApi from '../common'; // Import your API config
import { setUserDetails } from '../store/userSlice';

function UserPanel() {
  const user = useSelector((state) => state?.user?.user); // Fetch user details from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for redirecting

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummeryApi.logout_user.url, {
        method: SummeryApi.logout_user.method,
        credentials: 'include',
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null)); // Clear user details after logout
        navigate('/'); // Redirect to home page after successful logout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Ref for login section
  const userSectionRef = useRef(null);

  // Scroll to login section when component mounts
  useEffect(() => {
    if (userSectionRef.current) {
      userSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []); // Runs only on initial mount

  return (
    <section id="userpannel" ref={userSectionRef}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 pt-2 bg-slate-50 shadow-lg">
          <div className="p-4 rounded-r-md bg-blue-600">
            <h1 className="text-3xl font-bold text-white">Your Account</h1>
          </div>

          <div className="flex flex-col items-center my-6">
            {user?.profilePic ? (
              <img
                src={`data:image/jpeg;base64,${user?.profilePic}`}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-500" />
            )}

            <h2 className="text-lg font-semibold mt-4">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <nav className="mt-10">
            <ul>
              <li className="mb-6">
                <Link to="/user/orders" className="flex items-center p-4 text-gray-500 hover:bg-gray-300 rounded-r-md">
                  <IoIosCart className="mr-2 text-xl" />
                  My Orders
                </Link>
              </li>
              <li className="mb-6">
                <Link to="/user/wishlist" className="flex items-center p-4 text-gray-500  hover:bg-gray-300 rounded-r-md">
                  <IoIosHeart className="mr-2 text-xl" />
                  Wishlist
                </Link>
              </li>
              <li className="mb-6">
                <Link to="/user/settings" className="flex items-center p-4 text-gray-500  hover:bg-gray-300 rounded-r-md">
                  <IoIosSettings className="mr-2 text-xl" />
                  Account Settings
                </Link>
              </li>
            </ul>
          </nav>

          {user?._id ? (
            <div className="absolute top-0 right-4 p-4">
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                <IoIosLogOut className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="absolute -bottom-16 p-4 w-full">
              <Link to={"/signin"} className="flex items-center w-full p-4 bg-red-600 text-white rounded-md hover:bg-red-700">Sign in</Link>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow bg-[#F8F9FA] p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h2>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Your Account Details</h3>
            <ul>
              <li className="mb-3"><strong>Name:</strong> {user?.name}</li>
              <li className="mb-3"><strong>Email:</strong> {user?.email}</li>
              <li className="mb-3"><strong>Orders:</strong> You have {user?.orders?.length || 0} orders.</li>
              <li><strong>Wishlist:</strong> You have {user?.wishlist?.length || 0} items in your wishlist.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserPanel;
