import './App.css'
import Home from './components/home/Home'
import Products from './components/products/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import About from './components/About/About'
import Contact from './components/contact/contact'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Cart from './components/cart/Cart'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import PrivateRoute from './components/shared/PrivateRoute'
import Profile from './components/auth/Profile'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/steps/payment/PaymentConfirmation'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/dashboard/Dashboard'
import Category from './components/admin/categories/Category'
import AdminProducts from './components/admin/products/AdminProducts'
import Sellers from './components/admin/sellers/Sellers'
import Orders from './components/admin/orders/Orders'

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-confirm' element={<PaymentConfirmation />} />
          </Route>

          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Route>

          <Route path='/' element={<PrivateRoute adminOnly />}>
            <Route path='/admin' element={<AdminLayout />} >
              <Route path='' element={<Dashboard />} />
              <Route path='categories' element={<Category />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='orders' element={<Orders />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-right' />
    </React.Fragment>

  )
}

export default App
