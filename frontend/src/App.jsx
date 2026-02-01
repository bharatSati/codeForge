import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
const Info = React.lazy(()=>(import("./pages/info")))
const Sheet = React.lazy(()=>(import("./pages/sheet")))
const LandingPage = React.lazy(()=>(import("./pages/landingPage")))
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';



function App() {

  return (
   <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element = {<LandingPage/>}/>
              <Route path='/enterDetails' element = {<Info/>}/>
              <Route path='/epsilon'  element = {<Sheet flag = {true}/>}/>
              <Route path='/delta' element = {<Sheet flag = {false}/>}/>
            </Routes>
        </BrowserRouter>
      <ToastContainer position="top-right"  autoClose={3000} />
    </>
  )
}

export default App
