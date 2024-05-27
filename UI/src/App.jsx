import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Reviews from './pages/Reviews/Reviews'
import Restaurant from './pages/Restaurant/Restaurant'
import AddReview from './pages/AddReview'


const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Reviews' element={<Reviews/>}/>
        <Route path='/Restaurant/:restaurantId' element={<Restaurant/>}/>
        <Route path='/AddReview/:restaurantId' element={<AddReview/>}/>


        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App