import React from 'react'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from '../pages/ForgotPassword'
import Signup from '../pages/Signup'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import UserPanel from '../pages/UserPannel'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import ViewCart from '../pages/ViewCart'
import SearchProduct from '../pages/SearchProduct'
import Contact from '../pages/Contact'
// import Privacy from '../pages/PrivacyPolicy'


function Routings() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/privacy" element={<Privacy />} /> */}


          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/product-category" element={<CategoryProduct />}></Route>
          <Route path='/product/:id' element={<ProductDetails />} />

          <Route path="/Admin-panel" element={<AdminPanel />}>
            <Route path="All-Users" element={<AllUsers />} />
            <Route path="All-Products" element={<AllProducts />} />
          </Route>
          <Route path="/My-account" element={<UserPanel  />} />
          <Route path="/view-cart-product" element={<ViewCart  />} />
          <Route path="/search" element={<SearchProduct />} />
      </Routes>
    </div>
  )
}

export default Routings
