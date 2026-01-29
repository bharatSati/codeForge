import "../componentsCSS/ratingPallete.css"
import {useContext} from "react"
import { RatedDataContext } from "../context/ratedDataContext.jsx"

export default function RatingPallete({ currentRating , setCurrentRating}){
    const { ratedData } = useContext(RatedDataContext);
    const clickHandler = (rating)=>{
        setCurrentRating(rating);
    }
    
    return(
        
        <div className="ratingPallete">
            <div className="ratingPalleteHeading">RATING</div>
            <div className="ratingBoxContainer">
                <div className="ratingBoxContainerLevel">
                        {ratedData && ratedData.ratedArray && ratedData.ratedArray.map((e,i)=>{
                            if(!e.length) return null;
                            return(
                                  <div key = {100*i} className={` ${currentRating == i*100 ?  "ratingBoxSelected":"ratingBox"}`} onClick = {()=>clickHandler(i*100)}> {i*100} </div>
                            )


                        })}
                </div>
            </div>
            
        </div>
    )

}