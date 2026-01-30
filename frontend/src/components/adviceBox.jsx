import "../componentsCSS/adviceBox.css"

export default function AdviceBox({content}){
    return(
        <div className="adviceBox" style={{ whiteSpace: "pre-wrap" }}>
            {content}
        </div>
    )

}