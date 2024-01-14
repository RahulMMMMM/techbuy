import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles.css"
import { Link, Outlet } from 'react-router-dom';
import logo from '../images/logo.png'
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { CartContext } from '../Context/CartContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props){
    const cart = useContext(CartContext);
    const [curSection, setCurSection] = useState("");
    const auth = useContext(AuthContext);
    const [searchParams,setSearchParams] = useState("");

    const cartQuantity = cart.getCartQuantity();

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(searchParams.length>0){
            
            navigate(`/search?k=${searchParams}`, {replace:true});
            navigate(0)
        }
    }

    return(
        <>
        <nav className='navbar'>
            <a href='/' onClick={()=>{setCurSection("")}} ><img src={logo} className='logo' /></a>
            
               
            <form className='search-form' onSubmit={handleSubmit} >
                <input type='text' placeholder=' Search anything!' className='searchbox' onChange={(e)=> setSearchParams(e.target.value)}  />
                <button type='submit' className='search-button'><SearchIcon /></button>
            </form>
            <div className='left-navbar-container'>
                {
                    auth.auth?.firstname?.length > 0 ? <p className="nav-greeting">Hello {auth.auth.firstname}</p> : ''
                }
                <Link to='myaccount/dashboard' className='cart-link-container' >
                    <AccountCircleIcon  style={{fontSize: "2rem"}} />
                    <a>Account</a>
                </Link>
                <Link to='/cart' className='cart-link-container' >
                    <ShoppingCartIcon  style={{fontSize: "2rem"}} />
                    {cartQuantity>0&&<div className='cart-quantity'>{cartQuantity}</div>}
                    <a>Cart</a>
                </Link>
            </div>
              
                 
            
            
            

        </nav>
        
        </>
    );
}
