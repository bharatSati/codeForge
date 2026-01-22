import "../componentsCSS/midPalleteRatingWise.css"
import  RatingPallete  from './ratingPallete.jsx'
import  ProgressPallete  from './progressPallete.jsx'

export default function MidPalletRatingWise(){

    return(
        <div className="midPalleteRatingWise">
            <div className="ratingPallete1"><RatingPallete></RatingPallete></div>
            <div className="ratingPallete2"><ProgressPallete></ProgressPallete></div>
          
        </div>
    )

}