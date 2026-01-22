import { useState } from 'react'
import './App.css'
import  Card1  from './components/card1.jsx'
import  Navbar  from './components/navbar.jsx'
import  MidPalleteRatingWise  from './components/midPalleteRatingWise.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
    hello
    <Card1></Card1>
        hello
      <MidPalleteRatingWise></MidPalleteRatingWise>
    </>
  )
}
export default App
