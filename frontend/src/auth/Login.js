import { Link } from "react-router-dom";
import { useRef,useState,useEffect,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "../api/Axios";
const LOGIN_URL = '/auth/login';

export default function Login() {
    const {auth,setAuth} = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password]) 

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const response = await axios.post(LOGIN_URL,
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                   
                }
            );

            const accessToken = response?.data?.accessToken;
            const firstname = response?.data?.firstname;
            const lastname = response?.data?.lastname;
            setAuth({email,password,accessToken,firstname,lastname});
            setEmail('');
            setPassword('');
            window.location.assign('http://localhost:3000/');
        } catch(err){
            const errorMsg = err.response.data.message;
            setErrMsg(errorMsg);
            
        }
        
    }

    return (
        <div className="login-container" >
                <form className="login-form" onSubmit={handleSubmit} >
                    <h2>Login To Your Account</h2>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="login-input"
                        ref={emailRef} 
                        onChange={(e)=> setEmail(e.target.value)} 
                        value={email} 
                        required/>
                    <input type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        onChange={(e)=> setPassword(e.target.value)} 
                        value={password} 
                        required/>
                    <button type="submit" className="login-button" >Sign In</button>
                </form>
                <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
                <div className="signup-box">
                <p>Don't have an account?</p>
                <Link to='/signup'>Sign up</Link>
                </div>
        </div>

    );
}