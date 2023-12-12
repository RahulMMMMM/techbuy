import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";


const Dashboard = () =>{
    const auth = useContext(AuthContext);

    return(
        <div style={{backgroundColor:"white",padding:"100px"}}>
            <p>Hello {auth.auth.firstname}</p>
            <Link to="/myaccount/logout">Logout</Link>
            <div>
                <h3>Account info</h3>
                <p>Email Address</p>
                <p>{auth.auth.email}</p>
            </div>
        </div>
    )
}

export default Dashboard;