import "../componentsCSS/info.css"
import  Navbar  from '../components/navbar.jsx'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import axios from "axios";
export default function Info(){
    let navigate = useNavigate();
    const [user,setUser] = useState("");
    const [friend,setFriend] = useState("");
    const [loading,setLoading] = useState(false);

    let handleSubmit = async (user,friend)=>{
        setLoading(true);
        if(!user || !friend){
            toast.error("name cannot be empty")
            setLoading(false);
            return;}
        let result;
        try {
            console.log(user)
            result = await axios.get(`http://localhost:3000/ratedQuestions/${user}/${friend}`);
            navigate("/ratedSheet");
        }
        catch(error){ toast.error(error.response.data.message); }
        setLoading(false);
    }
     

    return(
        <>
        <Navbar></Navbar>
        <div className="info">
            <div className="infoHeading1">Enter Your Details</div>
            <div className="infoUserAcc">User CF Handle</div>
            <input type="text" className = "infoInput1" onChange={(e)=>setUser(e.target.value)} />
            <div className="infoFriendAcc">Friend CF Handle</div>
            <input type="text" className = "infoInput1" onChange={(e)=>setFriend(e.target.value)}/>
            <div className={`${!loading ? "infoSubmitButton":"infoSubmitButtonLoading"}`} onClick={()=>handleSubmit(user,friend)}>{loading ? "WORKING...":"SUBMIT"}</div>
        </div>
        </>
    )

}