import './App.css'
import Home from './components/home/Home'
import Products from './components/products/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import About from './components/About/About'
import Contact from './components/contact/contact'
import { Toaster } from 'react-hot-toast'
import React from 'react'

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
        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-right' />
    </React.Fragment>

  )
}

export default App
