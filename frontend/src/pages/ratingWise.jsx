import "../componentsCSS/ratingWiseRoute.css"
import { useNavigate } from "react-router-dom"
import { useState , useContext , useEffect} from "react"
import { RatedDataContext } from "../context/ratedDataContext.jsx"
import  RatingPallete  from '../components/ratingPallete.jsx'
import  ProgressPallete  from '../components/progressPallete.jsx'
import  QuestionPallete  from '../components/questionPallete.jsx'
import  Card1  from '../components/card1.jsx'
import  Navbar  from '../components/navbar.jsx'
import  AdviceBox  from '../components/adviceBox.jsx'
import { toast } from "react-toastify"

export default function RatingWiseRoute(){
    const { ratedData } = useContext(RatedDataContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!ratedData){
            navigate('/enterDetails');
            toast.error("Enter Details First");}
    },[])
    const [ currentRating , setCurrentRating ] = useState(800);
    return(
        <div className="ratingWise">
        <Navbar></Navbar>
        <Card1 content = {ratedData?.parsed[0] || []} avatar = {ratedData?.avatar || ""} user = {ratedData?.user || ""}></Card1>
        <div className="paddingManager">
            <div className="midPalleteRatingWise">
                <div className="topMidPalleteRatingWise">
                    <div className="ratingPallete1"><RatingPallete currentRating = {currentRating} setCurrentRating = {setCurrentRating}></RatingPallete></div>
                    <div className="ratingPallete2"><ProgressPallete total = {ratedData?.total || ""} userCompleted = {ratedData?.userCompleted || ""}></ProgressPallete></div>
                </div>
                <div className="bottomMidPalleteRatingWise">
                    <div className="ratingPallete3"><ProgressPallete total = {ratedData?.total || ""} userCompleted = {ratedData?.userCompleted || ""}></ProgressPallete></div>
                    <div className="ratingPallete4"><AdviceBox content = {ratedData?.parsed[1][(currentRating-800)/100].analysis || ""}></AdviceBox></div>
                </div>
            </div>
        </div>

        <div className="paddingManager"><QuestionPallete questions={ratedData?.ratedArray?.[currentRating / 100] || []}></QuestionPallete></div>
        </div>
    )

}