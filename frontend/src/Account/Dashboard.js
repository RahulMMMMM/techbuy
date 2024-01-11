import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';

const Dashboard = () =>{
    const auth = useContext(AuthContext);

    return(
        <div style={{backgroundColor:"white",padding:"100px"}} className="dash-container">
            <h1>Your Account</h1>
            <div className="a-box-container">
                <Link to="/myaccount/login&security" style={{ textDecoration: 'none' }}>
                    <div className="a-box">
                        <AdminPanelSettingsIcon style={{fontSize: "5rem"}}/>
                        <h2>Login & Security</h2>
                    </div>
                </Link>
                <Link to="/myaccount/orders" style={{ textDecoration: 'none' }}>
                    <div className="a-box">
                        <InventoryIcon style={{fontSize: "5rem"}}/>
                        <h2>Your Orders</h2>
                    </div>
                </Link>
                    
                <Link to="/myaccount/addresses" style={{ textDecoration: 'none' }}>
                    <div className="a-box">
                        <HomeIcon style={{fontSize: "5rem"}}/>
                        <h2>Your Addresses</h2>
                    </div>
                </Link>
                <Link to="/myaccount/payments" style={{ textDecoration: 'none' }}>
                    <div className="a-box">
                        <PaymentIcon style={{fontSize: "5rem"}}/>
                        <h2>Your Payments</h2>
                    </div>
                </Link>
                
                
                
                
            </div>
        </div>
    )
}

export default Dashboard;