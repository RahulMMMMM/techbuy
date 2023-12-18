import { useContext } from "react";
import axios from "../api/Axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

export default function Logout() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const cart = useContext(CartContext);

    const logout = async () =>{
        try{
            const response = await axios.post('/auth/logout',{},{
                withCredentials: true
            }
            );
            console.log(response.data.message)
            if(response.data.message){
                auth.deleteAll();
                cart.changeEmail("");
                cart.changeCart([])
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