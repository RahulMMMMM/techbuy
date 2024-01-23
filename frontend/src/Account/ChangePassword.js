import { useContext, useState,useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "../api/Axios";

export default function ChangePassword() {
    const [password,setPassword] = useState("");
    const [cpassword,setCPassword] = useState("");
    const [errMsg,setErrMsg] = useState("");
    const [queryParams] = useSearchParams();
    const errRef = useRef();
    const auth = useContext(AuthContext);

    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          const response = await axios.post('/auth/update-user',
            { type:"password",info:[password,cpassword] },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
               
            }

          );

          navigate('/myaccount/login-security');
        }
        catch(err){
            const errorMsg = err.response.data.message;
            setErrMsg(errorMsg);
        }
    }

    return (
      <div className="change-info-container">
        <h1>Change your password</h1>
        <div className="change-info-container-two">
          <p>If you want to change the password associated with your Amazon customer account, you may do so below. Be sure to click the Save Changes button when you are done.</p>
          <form className="change-info-form">
            <h3>New name</h3>
            <input type="password" placeholder="New Password" onChange={(e)=>setPassword(e.target.value)} />
            <input type="password" placeholder="Old Password" onChange={(e)=>setCPassword(e.target.value)} />
            <button type="submit" onClick={handleSubmit}>Save Changes</button>
          </form>
          <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        </div>
      </div>
    );
}
  