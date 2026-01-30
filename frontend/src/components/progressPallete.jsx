import "../componentsCSS/progressPallete.css"

export default function ProgressPallete({userCompleted , total}){

    return(
        <div className="progressPallete">
            {userCompleted} / {total}
        </div>
    )

}