import { useContext } from "react";
import axios from "../api/Axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Logout() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const logout = async () =>{
        try{
            auth.deleteAll();
            const response = await axios.post('/auth/logout',{},{
                withCredentials: true
            }
            );
            console.log(response.data.message)
            if(response.data.message){
                navigate('/');
            }
            else{
                console.log("Unable to logout")
            }
        }
        catch(err){
            console.log(err);
        }

    }

    return(
        <div style={{backgroundColor:"white",padding:"100px"}}>
            <button onClick={logout} >Logout</button>
        </div>
    )
}