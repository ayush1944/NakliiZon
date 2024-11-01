import React from 'react';
import { FaUsers, FaCog, FaChartLine, FaTasks, FaUserPlus, FaServer } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">Admin Dashboard</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Users Overview */}
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
          <FaUsers className="text-[#44655a] text-4xl mr-4" />
          <div>
            <h4 className="text-xl font-semibold text-gray-700">Total Users</h4>
            <p className="text-gray-500">150</p> {/* Example value */}
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
          <FaChartLine className="text-[#F29F05] text-4xl mr-4" />
          <div>
            <h4 className="text-xl font-semibold text-gray-700">Active Users</h4>
            <p className="text-gray-500">120</p> {/* Example value */}
          </div>
        </div>

        {/* Server Status */}
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
          <FaServer className="text-[#F3A820] text-4xl mr-4" />
          <div>
            <h4 className="text-xl font-semibold text-gray-700">Server Status</h4>
            <p className="text-gray-500">Online</p> {/* Example value */}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Add New User */}
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
          <FaUserPlus className="text-[#44655a] text-4xl mr-4" />
          <div>
            <h4 className="text-xl font-semibold text-gray-700">Add New User</h4>
            <p className="text-gray-500">Create a new user account</p>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
          <FaCog className="text-[#F29F05] text-4xl mr-4" />
          <div>
            <h4 className="text-xl font-semibold text-gray-700">System Settings</h4>
            <p className="text-gray-500">Manage system settings</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activities</h3>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <ul className="space-y-4">
          <li className="flex items-start">
            <FaTasks className="text-[#44655a] text-2xl mr-4" />
            <div>
              <h4 className="text-lg font-semibold text-gray-700">New User Signup</h4>
              <p className="text-gray-500">John Doe signed up 2 hours ago.</p>
            </div>
          </li>
          <li className="flex items-start">
            <FaTasks className="text-[#F29F05] text-2xl mr-4" />
            <div>
              <h4 className="text-lg font-semibold text-gray-700">System Update</h4>
              <p className="text-gray-500">System updated successfully.</p>
            </div>
          </li>
          <li className="flex items-start">
            <FaTasks className="text-[#F3A820] text-2xl mr-4" />
            <div>
              <h4 className="text-lg font-semibold text-gray-700">User Password Reset</h4>
              <p className="text-gray-500">Admin reset password for Jane Smith.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
