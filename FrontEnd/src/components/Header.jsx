import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { IoIosSearch } from "react-icons/io";
import Logo1 from '../assest/logoji.png';
import { IoIosLogOut } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummeryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/Role';
import Context from '../context';
import SignInSignUpButton from '../helper/signInSignUp';

function Header() {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context)
  const navigate = useNavigate()    
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)
  const location = useLocation(); // To track current route

  const handleLogout = async () => {
    const fetchData = await fetch(SummeryApi.logout_user.url, {
      method: SummeryApi.logout_user.method,
      credentials: 'include',
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  // Hide header if on My Account or Admin Panel pages
  const hideHeaderRoutes = ['/Admin-panel', 
    '/My-account' , 
    '/Admin-panel/All-Users',
    '/Admin-panel/All-Products', 
    '/signin', 
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/Admin-panel/All-Orders',
    '/Admin-panel/All-Orders/Order-Details',
    '/Admin-panel/All-Orders/Order-Details/Order-Details',
    '/Admin-panel/All-Orders/Order-Details/Order-Details/Order-Details',

  ];
  if (hideHeaderRoutes.includes(location.pathname)) {
    return null; // Return null to hide header
  }

const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 fixed z-40 w-full shadow-sm bg-blue-50'>
      <div className='container h-full mx-auto flex items-center justify-around'>
        <div className='h-16 w-48'>
          <Link to={"/"} className='h-full w-full'>
            <div className='flex items-center justify-center py-3 flex-row gap-1 shadow-sm hover:shadow-md'>
              <div className='mt-1'>
                <PiShoppingCartDuotone className='text-3xl text-gray-500' />
              </div>
              <h1 className='text-3xl font-bold'>Nakli <span className='font-thin bg-[#F3A820] rounded-r-md pl-1 pr-2 -ml-2'>Zon</span></h1>
            </div>
          </Link>
        </div>

        {/* Search Box */}
        <div className='SearchBox hidden lg:flex items-center w-[30%] justify-between shadow-sm bg-zinc-50 rounded-l-md'>
          <input className='searchInput p-2 w-full outline-none bg-grey-900 rounded-l-md' type="text" placeholder='search product here...' onChange={handleSearch} value={search}/>
          <div className='SearchIcon cursor-pointer bg-[#F3A820] rounded-r-md p-2'>
            <IoIosSearch className='text-2xl text-gray-500' />
          </div>
        </div>

        {/* Icons */}
        <div className='flex flex-row gap-5'>
          <div onClick={() => setMenuDisplay(prev => !prev)} className='relative'>
            {user?._id && (
              <div className='cursor-pointer relative flex justify-center text-3xl'>
                {user?.profilePic ? (
                  <img src={`data:image/jpeg;base64,${user?.profilePic}`} alt={user?.name} className='w-8 h-8 rounded-full object-cover' />
                ) : (
                  <FaRegUserCircle className='text-3xl text-gray-500' />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className='absolute bg-blue-600 bottom-0 top-9 h-fit -left-10 hidden md:block shadow-lg rounded text-white z-50'>
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <Link to={"Admin-panel"} className="whitespace-nowrap hover:bg-blue-700 h-full w-full p-2 rounded hidden md:block">Admin Panel</Link>
                  ) : (
                    <Link to={"My-account"} className="whitespace-nowrap hover:bg-blue-700 h-full w-full p-2 rounded hidden md:block">My Account</Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Cart Button */}
          {user?._id && (          <Link to={'/view-cart-product'} className='relative cursor-pointer'>
            <IoCartOutline className='text-3xl text-gray-500' />
            <div className='bg-orange-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
              <p className='text-xs'>{context?.cartProductCount}</p>
            </div>
          </Link>)}

          {/* Login/Logout button */}
          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='flex items-center px-4 py-1 text-white bg-red-600 rounded-full hover:bg-red-700'>
                <IoIosLogOut className="mr-2" />
                Logout
              </button>
            ) : (
              // <Link to={"signin"} className='px-10 py-2 text-white bg-orange-600 rounded-full hover:bg-orange-800'>Sign in</Link>
              <SignInSignUpButton/>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
