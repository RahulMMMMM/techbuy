import { useContext, useState,useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "../api/Axios";

export default function ChangeInfo() {
    const [info,setInfo] = useState("");
    const [errMsg,setErrMsg] = useState("");
    const [queryParams] = useSearchParams();
    const errRef = useRef();
    const auth = useContext(AuthContext);

    const query = queryParams.get("info");

    const navigate = useNavigate();

    const onInputChange = async (e) => {

      setInfo(e.target.value)

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          const response = await axios.post('/auth/update-user',
            { type:query,info },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
               
            }

          );

          query === "email" ? auth.setAuthInfo(info,auth.auth.firstname,auth.auth.lastname) : auth.setAuthInfo(auth.auth.email,info.slice(0,info.indexOf(" ")),info.slice(info.indexOf(" ")+1));

          navigate('/myaccount/login-security');
        }
        catch(err){
            const errorMsg = err.response.data.message;
            setErrMsg(errorMsg);
        }
    }

    return (
      <div className="change-info-container">
        <h1>Change your {query}</h1>
        <div className="change-info-container-two">
          <p>If you want to change the {query} associated with your Amazon customer account, you may do so below. Be sure to click the Save Changes button when you are done.</p>
          <form className="change-info-form">
            <h3>New name</h3>
            <input type="name" placeholder={query==="email"?auth.auth.email:auth.auth.firstname+" "+auth.auth.lastname} onChange={onInputChange} />
            <button type="submit" onClick={handleSubmit}>Save Changes</button>
          </form>
          <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        </div>
      </div>
    );
}
  