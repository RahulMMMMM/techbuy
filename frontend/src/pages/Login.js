import { Link } from "react-router-dom";
import {useForm} from "react-hook-form"

export default function Login() {
  const {register,handleSubmit} = useForm();

  const login = async (data)=>{
     await fetch('http://localhost:4000/auth/login',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        if(res.url){
            window.location.assign(res.url);
        }
    }) 

  } 

  return (
      <div className="login-container" >
            <form className="login-form" onSubmit={handleSubmit(login)} >
                <h2>Create a TechBuy Account</h2>
                <input type="email" placeholder="Email Address" className="login-input" {...register("email")}  required />
                <input type="password" placeholder="Password" className="login-input" {...register("password")}  required />
                <button type="submit"className="login-button" >Sign In</button>
            </form>
            <div className="signup-box">
              <p>Already have an account?</p>
              <Link to='/login'>Login</Link>
            </div>
      </div>

  );
}