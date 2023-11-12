import { useState } from "react";
import useAuth from "../hooks/useAuth";


const Dashboard = () =>{
    const auth = useAuth();

    return(
        <p>Hello {auth.firstname}</p>
    )
}

export default Dashboard;