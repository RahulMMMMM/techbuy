import { useContext } from "react";
import CartProductCard from "../components/CartProductCard";
import { CartContext } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import SavedProductCard from "../components/SavedProductCard";
import axios from "../api/Axios";


export default function Cart(){

    const cart = useContext(CartContext);
    const navigate = useNavigate();

    const subtotal = (Math.trunc(cart.getCartTotal()*100)/100);
    const totalNoTax = (subtotal > 50 || subtotal === 0)? subtotal : subtotal+21;
    const total = (Math.trunc((totalNoTax*1.07)*100)/100);


    const routeChange = () =>{ 
        const path = '/'; 
        navigate(path);
      }
      
    

    const checkout = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:4000/checkout',
            {items: cart.cart},
            {
                headers: { 'Content-Type': 'application/json' }
            });
            const url = response?.data?.url;
            console.log(url)
            if(url){
                window.location.assign(url);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="cart-container">
            <div className="cart-saved-container">
                <div className="cart-product-container">
                    <h2 className="your-cart">Your Cart</h2>
                    {
                        cart.cart.length > 0 ?
                        cart.cart.map((product)=>{
                            return(
                                
                                <CartProductCard image={product.image_src} title={product.title} price={product.price} quantity={product.quantity} 
                                id={product._id} stripe_id={product.stripe_id} />
                            )
                        }) : 
                        (
                            <div className="empty-product-card-container">
                                <h1>Your Cart is Empty.</h1>
                                <p>Check your Saved for later items below or <Link to="/">continue shopping.</Link></p>
                            </div>
                        )
                    }
                </div>
                <div className="saved-product-container">
                    <h2 className="your-cart">Saved For Later</h2>
                    {cart.saved.map((product)=>{
                        return(
                            
                            <SavedProductCard image={product.image_src} title={product.title} price={product.price} quantity={product.quantity} 
                            id={product._id} stripe_id={product.stripe_id} />
                        )
                    })}
                </div>
            </div>
            <div className="cart-info">
                <h1>Order Summary</h1>
                <hr />
                <div className="order-summary">
                    <h4>Subtotal</h4>
                    <h4>${(subtotal).toFixed(2)}</h4>
                </div>
                <div className="order-summary">
                    <h4>Shipping</h4>
                    {(subtotal > 50 || subtotal === 0) ? <h4>Free</h4> : <h4>$21.00</h4>}
                </div>
                <div className="order-summary">
                    <h4>Estimated Sales Tax</h4>
                    <h4>${(Math.trunc((totalNoTax*.07)*100)/100).toFixed(2)}</h4>
                </div>
                <hr />
                <div className="order-summary">
                    <h2>Total</h2>
                    <h2>${total.toFixed(2)}</h2>
                </div>
                {cart.cart.length>0?<button className="checkout-button" onClick={checkout}>Checkout</button>:<button className="continue-shop-button" onClick={routeChange}>Continue Shopping</button>}
            </div>
        </div>
    )
}