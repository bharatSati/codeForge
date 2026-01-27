import "../componentsCSS/info.css"
import  Navbar  from '../components/navbar.jsx'

export default function Info(){

    return(
        <>
        <Navbar></Navbar>
        <div className="info">
            <div className="infoHeading1">Enter Your Details</div>
            <div className="infoUserAcc">User CF Handle</div>
            <input type="text" className = "infoInput1" />
            <div className="infoFriendAcc">Friend CF Handle</div>
            <input type="text" className = "infoInput1" />
            <div className="infoSubmitButton">SUBMIT</div>
        </div>
        </>
    )

}