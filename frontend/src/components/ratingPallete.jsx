import "../componentsCSS/ratingPallete.css"
import {useContext} from "react"
import { RatedDataContext } from "../context/ratedDataContext.jsx"
import { TopicDataContext } from "../context/topicDataContext.jsx"

export default function RatingPallete({ flag , currentRating , setCurrentRating , currentTopic , setCurrentTopic}){
    const { ratedData } = useContext(RatedDataContext);
    const { topicData } = useContext(TopicDataContext);
    const clickHandler = (value)=>{
        if(flag) setCurrentRating(value);
        else setCurrentTopic(value);
    }
        let topicArray = ["implementation","math","brute force","sortings","binary search","two pointers","strings","bit manipulation","greedy","data structures","number theory","combinatorics","graphs","trees","dp","constructive algorithms","game theory","probabilities","geometry","interactive"];
    return(
        
        <div className="ratingPallete">
            <div className="ratingPalleteHeading">RATING</div>
            <div className="ratingBoxContainer">
                <div className="ratingBoxContainerLevel">
                        { flag ? 
                        
                                ratedData && ratedData.ratedArray && ratedData.ratedArray.map((e,i)=>{
                                    if(!e.length) return null;
                                    return(
                                            <div key = {i} className={` ${currentRating == i*100 ?  "ratingBoxSelected":"ratingBox"}`} onClick = {()=>clickHandler(i*100)}> {i*100} </div>
                                         )  


                                })


                        :


                                topicData && topicData.questionArray && topicData.questionArray.map((e,i)=>{
                                    if(!e.length) return null;
                                    return(
                                        <div key = {i} className={` ${currentTopic.toLowerCase() == topicArray[i].toLowerCase() ?  "ratingBoxSelected":"ratingBox"}`} onClick = {()=>clickHandler(topicArray[i])}> {topicArray[i]} </div>
                                          )
                                })
                    
                        }
    
                </div>
            </div>
            
        </div>
    )

}