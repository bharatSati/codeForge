import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
const Info = React.lazy(()=>(import("./pages/info")))
const RatingWise = React.lazy(()=>(import("./pages/ratingWise")))
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';



function App() {

  return (
   <>
        <BrowserRouter>
            <Routes>
              <Route path='/enterDetails' element = {<Info/>}/>
              <Route path='/ratedSheet' element = {<RatingWise/>}/>
            </Routes>
        </BrowserRouter>
      <ToastContainer position="top-right"  autoClose={3000} />
    </>
  )
}

export default App
