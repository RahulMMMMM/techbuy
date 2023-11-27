import axios from "../api/Axios";

export default function Logout() {

    const logout = async () =>{
        try{
            const response = await axios.post('/auth/logout');
            window.location.assign('http://localhost:3000/');
        }
        catch(err){
            console.log(err);
        }

    }

    return(
        <div>
            <button onClick={logout} >Logout</button>
        </div>
    )
}