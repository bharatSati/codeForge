import "../componentsCSS/ratingWiseRoute.css"
import  RatingPallete  from '../components/ratingPallete.jsx'
import  ProgressPallete  from '../components/progressPallete.jsx'
import  QuestionPallete  from '../components/questionPallete.jsx'
import  Card1  from '../components/card1.jsx'
import  Navbar  from '../components/navbar.jsx'
import  AdviceBox  from '../components/adviceBox.jsx'
export default function RatingWiseRoute(){

    return(
        <>
        <Navbar></Navbar>
        <Card1></Card1>
        <div className="paddingManager">
            <div className="midPalleteRatingWise">
                <div className="topMidPalleteRatingWise">
                    <div className="ratingPallete1"><RatingPallete></RatingPallete></div>
                    <div className="ratingPallete2"><ProgressPallete></ProgressPallete></div>
                </div>
                <div className="bottomMidPalleteRatingWise">
                    <div className="ratingPallete3"><ProgressPallete></ProgressPallete></div>
                    <div className="ratingPallete4"><AdviceBox></AdviceBox></div>
                </div>
            </div>
        </div>

        <div className="paddingManager"><QuestionPallete></QuestionPallete></div>
        </>
    )

}