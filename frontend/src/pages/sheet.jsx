import "../componentsCSS/sheet.css"
import { useNavigate } from "react-router-dom"
import { useState , useContext , useEffect} from "react"
import { RatedDataContext } from "../context/ratedDataContext.jsx"
import { TopicDataContext } from "../context/topicDataContext.jsx"
import  RatingPallete  from '../components/ratingPallete.jsx'
import  ProgressPallete  from '../components/progressPallete.jsx'
import  QuestionPallete  from '../components/questionPallete.jsx'
import  Card1  from '../components/card1.jsx'
import  Navbar  from '../components/navbar.jsx'
import  AdviceBox  from '../components/adviceBox.jsx'
import  SelectRandom  from '../components/selectRandom.jsx'
import { toast } from "react-toastify"

export default function RatingWiseRoute({flag}){
    let topicArray = ["implementation","math","brute force","sortings","binary search","two pointers","strings","bit manipulation","greedy","data structures","number theory","combinatorics","graphs","trees","dp","constructive algorithms","game theory","probabilities","geometry","interactive"];
    const { ratedData } = useContext(RatedDataContext);
    const { topicData } = useContext(TopicDataContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if((flag && !ratedData) || (!flag && !topicData)){
            navigate(`/enterDetails?flag=${flag}`);
            toast.error("Enter Details First");}
    },[flag, ratedData, topicData, navigate])
    const [ currentRating , setCurrentRating ] = useState(800);
    const [ currentTopic , setCurrentTopic ] = useState("Implementation");
    return(
        <div className="ratingWise">
        <Navbar></Navbar>
            {flag ?
                <Card1 content = {ratedData?.parsed[0] || []} avatar = {ratedData?.avatar || null} user = {ratedData?.user || null}></Card1>
            :
                <Card1 content = {topicData?.parsed[0] || []} avatar = {topicData?.avatar || null} user = {topicData?.user || null}></Card1>
            }   
        <div className="paddingManager">
            <div className="midPalleteRatingWise">
                <div className="topMidPalleteRatingWise">
                    <div className="ratingPallete1"><RatingPallete flag = {flag} currentRating = {currentRating} setCurrentRating = {setCurrentRating} currentTopic = {currentTopic} setCurrentTopic = {setCurrentTopic}></RatingPallete></div>
                    <div className="ratingPallete2"><ProgressPallete total = {ratedData?.total || topicData?.total || null} userCompleted = {ratedData?.userCompleted || topicData?.userCompleted || null}></ProgressPallete></div>
                </div>
                <div className="bottomMidPalleteRatingWise">
                    <div className="ratingPallete3"><ProgressPallete total = {ratedData?.total || topicData?.total || null} userCompleted = {ratedData?.userCompleted || topicData?.userCompleted || null}></ProgressPallete></div>
                    {flag ? 
                        <div className="ratingPallete4"><AdviceBox content = {ratedData?.parsed[1][(currentRating-800)/100].analysis || ""}></AdviceBox></div>
                    :
                        
                            topicArray.map((e,i)=>{
                                if(e.toLowerCase()==currentTopic.toLowerCase()) return <div key = {i} className="ratingPallete4"><AdviceBox content = {topicData?.parsed[1][i].analysis || ""}></AdviceBox></div>
                                return null;
                            })
                    }
                </div>
            </div>
        </div>

        {flag ?
            <div className="paddingManager"><QuestionPallete questions={ratedData?.ratedArray?.[currentRating / 100] || []}></QuestionPallete></div>
        :
            
            topicArray.map((e,i)=>{
                if(e.toLowerCase()==currentTopic.toLowerCase()) return <div key = {i} className="paddingManager"><QuestionPallete questions={topicData?.questionArray?.[i] || []}></QuestionPallete></div>
                return null;    
            })
            
        }


        <div className="paddingManager"><SelectRandom></SelectRandom></div>
              
        </div>
    )

}