import { Link, useNavigate } from "react-router-dom";
import { useRef,useState,useEffect,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "../api/Axios";
const SIGNUP_URL = '/users/signup';

export default function Login() {
    const {setAuth} = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();
    

    const [email, setEmail] = useState('');
    const [firstname, setFirst] = useState('');
    const [lastname, setLast] = useState('');
    const [password, setPassword] = useState('');
    const [cnfrmPassword, setCnfrmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password]) 

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if(password!==cnfrmPassword){
            setErrMsg("Passwords don't match")
        }
        else{
            try{
                const response = await axios.post(SIGNUP_URL,
                    { email, password,firstname,lastname },
                    {
                        headers: { 'Content-Type': 'application/json' },
                       
                    }
                );
                
                setEmail('');
                setFirst('');
                setLast('');
                setPassword('');
                setCnfrmPassword('');

    
                navigate('http://localhost:3000/');
            } catch(err){
                const errorMsg = err.response.data.message;
                setErrMsg(errorMsg);
                
            }
        }
        
        
    }

    return (
        <div className="login-container" >
                <form className="login-form" onSubmit={handleSubmit} >
                    <h2>Create Your Account</h2>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="login-input"
                        ref={emailRef} 
                        onChange={(e)=> setEmail(e.target.value)} 
                        value={email} 
                        required/>
                    <input type="text" 
                        placeholder="First Name" 
                        className="login-input" 
                        onChange={(e)=> setFirst(e.target.value)} 
                        value={firstname} 
                        required/>
                    <input type="text" 
                        placeholder="Last Name" 
                        className="login-input" 
                        onChange={(e)=> setLast(e.target.value)} 
                        value={lastname} 
                        required/>
                    <input type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        onChange={(e)=> setPassword(e.target.value)} 
                        value={password} 
                        required/>
                    <input type="password" 
                        placeholder="Confirm Password" 
                        className="login-input" 
                        onChange={(e)=> setCnfrmPassword(e.target.value)} 
                        value={cnfrmPassword} 
                        required/>
                    
                    <button type="submit" className="login-button" >Sign Up</button>
                </form>
                <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
                <div className="signup-box">
                    <p>Already have an account?</p>
                    <Link to='/login'>Sign up</Link>
                </div>
        </div>

    );
}