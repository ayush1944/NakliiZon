import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import ChangeUserRole from '../components/ChangeUserRole';
import SummeryApi from '../common'; 

function AllUsers() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state to show a spinner or message during data fetch
  const [openUpdateRole, setOpenUpdateRole] = useState(false); // State to manage modal visibility

  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id : ""
  });
  // Fetch all users from the API
  const fetchAllUsers = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const fetchData = await fetch(SummeryApi.alluser.url, {
        method: SummeryApi.alluser.method,
        credentials: 'include', // Include cookies if necessary
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUser(dataResponse.data); // Set user data if successful
      } else {
        toast.error(dataResponse.message); // Show error if response indicates failure
      }
    } catch (error) {
      toast.error("Failed to fetch users. Please try again later."); // Handle fetch failure
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);


  if (loading) {
    return <div>Loading users...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className="h-full overflow-y-auto">
        <div className="flex justify-between items-center bg-slate-300 p-2 rounded mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Users : </h1>
        </div>
      <table className="w-full userTable bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2">Sr.</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            allUser.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{moment(user.createdAt).format('LL')}</td>
                <td className="p-2">
                  <button 
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white" 
                    onClick={() =>{ 
                      setUpdateUserDetails(user)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {openUpdateRole &&  (
        <ChangeUserRole
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          onClose={()=>setOpenUpdateRole(false)} 
          Callfunc = {fetchAllUsers}
       />
      )}
    </div>
  );
}

export default AllUsers;
