import "../componentsCSS/landingPage.css"
// import { useNavigate } from "react-router-dom"
// import { useState , useContext , useEffect} from "react"
// import { RatedDataContext } from "../context/ratedDataContext.jsx"
// import { TopicDataContext } from "../context/topicDataContext.jsx"
// import  RatingPallete  from '../components/ratingPallete.jsx'
// import  ProgressPallete  from '../components/progressPallete.jsx'
// import  QuestionPallete  from '../components/questionPallete.jsx'
// import  Card1  from '../components/card1.jsx'
import  Navbar  from '../components/navbar.jsx'
// import  AdviceBox  from '../components/adviceBox.jsx'
// import { toast } from "react-toastify"

export default function LandingPage(){
    return(
        <div className="landingPage">
        <Navbar></Navbar>
        <div className="codeForgeBox">CODE <span className = "forge">FORGE</span> </div>
        <div className="tagline"> The algorithmic forge where mathematical rigor meets competitive fire, tempering champions through &nbsp;<span className="epsilonDeltaText">EPSILON </span>&nbsp; - rating wise &nbsp;, <span className="epsilonDeltaText">DELTA</span>- topic wise &nbsp;proof of concept </div>
        </div>
    )

}