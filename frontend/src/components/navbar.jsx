import "../componentsCSS/navbar.css"
import Menu from "../assets/menu.svg";
import Close from "../assets/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    const [menu,setMenu] = useState(true);

    return(
        <>
        <div className="navbar">
            <div className="branding" onClick = {()=>navigate("/")}>CodeForge</div>
            <div className="navBarButton" onClick = {()=>navigate("/ratedSheet")}>EPSILON</div>
            <div className="navBarButton" onClick = {()=>navigate("/topcSheet")}>DELTA</div>
            <a className="navBarButton" href= 'https://www.linkedin.com/in/bharatsati/' target="_blank" rel="noopener noreferrer">CONTACT ME</a>
            <div className="fullMenuButton" onClick = {()=>setMenu(!menu)}><img src={ menu ? Menu:Close} alt="" /></div>
        </div>
            <div className="verticalMenu" style = {{display : menu ? "none":"flex"}}>
                <div className="verticalBarButton">HOME</div>
                <div className="verticalBarButton">EPSILON</div>
                <div className="verticalBarButton">DELTA</div>
                <div className="verticalBarButton">CONTACT ME</div>

            </div>
        </>  
        
    )

}