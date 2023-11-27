import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";


const Dashboard = () =>{
    const authInfo = useContext(AuthContext);

    return(
        <p>Hello {authInfo.firstname}</p>
    )
}

export default Dashboard;