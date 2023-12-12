import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles.css"
import { Link, Outlet } from 'react-router-dom';
import logo from '../images/logo.png'
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { CartContext } from '../Context/CartContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../Context/AuthContext';

export default function Navbar(props){
    const cart = useContext(CartContext);
    const [curSection, setCurSection] = useState("");
    const auth = useContext(AuthContext);

    const cartQuantity = cart.getCartQuantity();



    return(
        <>
        <nav className='navbar'>
            <a href='/' onClick={()=>{setCurSection("")}} ><img src={logo} className='logo' /></a>
            
               
            <form className='search-form'>
                <input type='text' placeholder=' Search anything!' className='searchbox' />
                <button type='submit' className='search-button'><SearchIcon /></button>
            </form>
            <div className='left-navbar-container'>
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
