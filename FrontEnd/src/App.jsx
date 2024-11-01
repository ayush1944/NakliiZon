import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import Footer from './components/Footer';
import Routings from './utilities/Routings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummeryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import './App.css';
import { Outlet } from 'react-router-dom';

export default function App() {

  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummeryApi.Current_user.url,{
      method: SummeryApi.Current_user.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }    
  }

  
  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummeryApi.countAddToCartProduct.url,{
      method: SummeryApi.countAddToCartProduct.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }
  useEffect(() => {
    // User Details
    fetchUserDetails()
    // Add to Cart
    fetchUserAddToCart()
  }, []);


  
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // user details
        cartProductCount, // current user add to cart
        fetchUserAddToCart // cart details to button of add ot cart
      }} >
    <div className="w-full h-screen font-['Satoshi'] flex flex-col min-h-screen overflow-y-scroll " >
      <ToastContainer 
        position='bottom-right'
      />
      <Header />
      <main className="flex-grow">
        <Routings />
        <Outlet />
      </main>
      <Footer />
    </div>
      </Context.Provider>
    </>

  );
}