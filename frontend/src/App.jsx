import { useState } from 'react'
import './App.css'
import RatingWiseRoute from './pages/ratingWise'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RatingWiseRoute></RatingWiseRoute>
    </>
  )
}
export default App
