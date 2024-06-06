import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import MyOrders from './pages/MyOrders/MyOrders';
import { Toaster } from 'react-hot-toast';

function App() {
  const [showLogin, setShowLogin]=useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
          <Navbar setShowLogin={setShowLogin}/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/order' element={<PlaceOrder/>}/>
              <Route path='/myorders' element={<MyOrders/>}/>
          </Routes>
      </div>
      <Toaster/>
      <Footer/>
    </>
  )
}

export default App
