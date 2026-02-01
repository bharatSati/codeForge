import "../componentsCSS/info.css"
import  Navbar  from '../components/navbar.jsx'
import { useState , useContext  } from 'react'
import { useNavigate , useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { RatedDataContext } from "../context/ratedDataContext.jsx";
import { TopicDataContext } from "../context/topicDataContext.jsx";
import axios from "axios";

export default function Info(){
    let navigate = useNavigate();
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const flag = params.get("flag") === "true";
    const { setRatedData } = useContext(RatedDataContext);
    const { setTopicData } = useContext(TopicDataContext);
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
            result = (flag) ? 
                        await axios.get(`http://localhost:3000/ratedQuestions/${user}/${friend}`)
                    :
                        await axios.get(`http://localhost:3000/topicWiseCF/${user}/${friend}`);
            console.log(result);
            toast.success("Sheet Generated Successfully");
            if(flag){
                setRatedData(result.data);
                navigate("/epsilon");}
            else{
                setTopicData(result.data);
                navigate("/delta");}
        }
        catch(error){ 
            if(error.response.data.message) toast.error(error.response.data.message);
            else toast.error("Server Error");
        }
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