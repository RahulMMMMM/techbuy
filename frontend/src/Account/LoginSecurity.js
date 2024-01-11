import {useContext} from "react"
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/Axios";

export default function LoginSecurity() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
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



    
    return (
      <div className="logsec-container">
          <h2>Login & Security</h2>
          <div className="log-info-container">
            <div className="info-container">
              <div>
                <strong>Name:</strong>
                <p>{auth.auth.firstname+" "+auth.auth.lastname}</p>
              </div>
              <button className="edit-button">Edit</button>
            </div>
            <div className="info-container">
              <div>
                <strong>Email:</strong>
                <p>{auth.auth.email}</p>
              </div>
              <button className="edit-button">Edit</button>
            </div>
            <div className="info-container">
              <div>
                <strong>Password:</strong>
                <p>********</p>
              </div>
              <button className="edit-button">Edit</button>
            </div>
            <div className="info-container-bottom">
              <button className="edit-button" onClick={logout}>Logout</button>
            </div>
            
          </div>
      </div>
    );
}
  