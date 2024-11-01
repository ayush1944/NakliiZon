import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import ROLE from '../common/Role';
import SummeryApi from '../common'; // Make sure you have the correct path for API

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,  // Add userId as a prop
  onClose,
  Callfunc // onClose callback to close the modal
}) => {
  const [userRole, setUserRole] = useState(role); // Set initial role state

  // Remove useEffect since you are already passing name, email, and role as props
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value); // Update selected role
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(SummeryApi.updateUser.url, {
        method: SummeryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, // Send the userId to identify the user
          role: userRole, // Updated role to be sent to the server
        }),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success('User role updated successfully');
        onClose();
        Callfunc() // Close the modal on success
        // window.location.reload();
      } else {
        toast.error(responseData.message || 'Failed to update role');
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-md p-6 w-full max-w-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-4 sm:mx-auto rounded-lg">
        <button className="block ml-auto text-2xl  p-1 rounded-sm top-4 right-4 text-gray-500 hover:text-red-500" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium text-center">Change User Role</h1>
        <div className="mb-4 flex gap-2 items-center">
          <p className="text-sm font-semibold">Name:</p>
          <p>{name}</p>
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <p className="text-sm font-semibold">Email:</p>
          <p>{email}</p>
        </div>
        <div className="flex items-center justify-between my-4">
          <p className="text-sm font-semibold">Role:</p>
          <select
            className="border px-4 py-1 rounded-md w-1/2 text-sm"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full sm:w-fit mx-auto block border py-2 px-4 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
