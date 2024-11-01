import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { FaUsers, FaCogs, FaHome, FaSignOutAlt, FaBox, FaChartBar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SummeryApi from '../common';
import { setUserDetails } from '../store/userSlice';

const AdminPanel = () => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();




  const handleLogout = async () => {
    const response = await fetch(SummeryApi.logout_user.url, {
      method: SummeryApi.logout_user.method,
      credentials: 'include',
    });
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/signin');
    } else {
      toast.error(data.message);
    }
  };

  // No redirect on refresh
  if (!user) {
    return null; // Or a loading spinner if preferred
  }


  const isAllUsers = location.pathname.includes("All-Users");
  const isAllProducts = location.pathname.includes("All-Products");

  return (
    < >
      <div className="md:flex hidden h-screen ">
        {/* Sidebar */}
        <aside className="min-w-64 w-64 bg-indigo-800 text-white flex flex-col p-4 ">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              {user?.profilePic ? (
                <img
                  src={`data:image/jpeg;base64,${user?.profilePic}`}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FaUsers className="text-5xl text-gray-500" />
                </div>
              )}
            </div>
            <h2 className="mt-2 text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>

          <nav className="mt-6 relative">
            <Link
              to="All-Users"
              className={`flex items-center space-x-2 p-3 hover:bg-indigo-700 ${isAllUsers ? 'bg-indigo-700' : ''}`}
            >
              <FaUsers />
              <span>All Users</span>
            </Link>
            <Link
              to="All-Products"
              className={`flex items-center space-x-2 p-3 hover:bg-indigo-700 ${isAllProducts ? 'bg-indigo-700' : ''}`}
            >
              <FaBox />
              <span>All Products</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-2 p-3 hover:bg-indigo-700"
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-3 mt-auto bg-red-600 hover:bg-red-700 text-white w-full absolute -bottom-[54vh] rounded-r-full "
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        {/* <div className="flex-grow p-4 bg-gray-100"> */}
          <main className="flex-grow p-4 bg-gray-100 overflow-y-scroll">
            {isAllUsers || isAllProducts ? (
              <Outlet />
            ) : (
              // Display admin-related information and widgets
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>

                {/* Admin Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaUsers className="text-indigo-600 text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Total Users</h3>
                      <p className="text-xl font-bold">1,024</p> {/* Replace with real data */}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaBox className="text-green-600 text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Total Products</h3>
                      <p className="text-xl font-bold">560</p> {/* Replace with real data */}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaChartBar className="text-yellow-600 text-4xl mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Sales</h3>
                      <p className="text-xl font-bold">$76,340</p> {/* Replace with real data */}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Manage Users</li>
                    <li>Manage Products</li>
                    <li>View Sales Reports</li>
                  </ul>
                </div>

                {/* Important Notice or Message */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Important Updates</h3>
                  <p>Remember to review new user registrations and update product listings regularly.</p>
                </div>
              </div>
            )}
          </main>
        {/* </div> */}
      </div>
    </>
  );
};

export default AdminPanel;
