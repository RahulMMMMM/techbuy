import { Link } from "react-router-dom";
import {useForm} from "react-hook-form"

export default function Signup() {

  const {register,handleSubmit} = useForm();

  const signup = async (data)=>{
     await fetch('http://localhost:4000/auth/signup',{
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
            <form className="login-form" onSubmit={handleSubmit(signup)} >
                <h2>Create a TechBuy Account</h2>
                <input type="email" placeholder="Email Address" className="login-input" {...register("email")}  required />
                <input type="text" placeholder="First Name" className="login-input" {...register("firstName")} required />
                <input type="text" placeholder="Last Name" className="login-input" {...register("lastName")}  required />
                <input type="password" placeholder="Password" className="login-input" {...register("password")}  required />
                <input type="password" placeholder="Confirm Password" className="login-input"  required />
                <button type="submit"className="login-button" >Sign Up</button>
            </form>
            <div className="signup-box">
              <p>Already have an account?</p>
              <Link to='/login'>Login</Link>
            </div>
      </div>

  );
}