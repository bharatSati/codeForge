import "../componentsCSS/card1.css"

export default function Card1({content , avatar , user}){
    return(
        <div className="card1">
            <div className="userInfoCard">
               <div className="card1Left">
                <div className="card1Welcome">W E L C O M E</div>
                <div className="card1Name">{user}</div>
                <div className="card1Message">{content}</div>
            </div>
               
               <div className="card1Right">
                <div className="imgContainer"><img src={avatar} alt="" /></div>
               </div>
            </div>
        </div>
    )

}