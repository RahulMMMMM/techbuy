import { useContext } from "react";
import CartProductCard from "../components/CartProductCard";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";


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
      

    const checkout = async ()=>{
        await fetch('http://localhost:4000/checkout',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({items: cart.cart})
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            if(res.url){
                window.location.assign(res.url);
            }
        })
    }

    return(
        <div className="cart-container">
            <div className="cart-product-container">
                <h2 className="your-cart"> Your Cart</h2>
                {cart.cart.map((product)=>{
                    return(
                        
                        <CartProductCard image={product.image} title={product.title} price={product.price} quantity={product.quantity} 
                        id={product.id} />
                    )
                })}
            </div>
            <div className="cart-info">
                <h1>Order Summary</h1>
                <hr />
                <div className="order-summary">
                    <h4>Subtotal</h4>
                    <h4>${subtotal}</h4>
                </div>
                <div className="order-summary">
                    <h4>Shipping</h4>
                    {(subtotal > 50 || subtotal === 0) ? <h4>Free</h4> : <h4>$21.00</h4>}
                </div>
                <div className="order-summary">
                    <h4>Estimated Sales Tax</h4>
                    <h4>${(Math.trunc((totalNoTax*.07)*100)/100)}</h4>
                </div>
                <hr />
                <div className="order-summary">
                    <h2>Total</h2>
                    <h2>${total}</h2>
                </div>
                {cart.cart.length>0?<button className="checkout-button" onClick={checkout}>Checkout</button>:<button className="continue-shop-button" onClick={routeChange}>Continue Shopping</button>}
            </div>
        </div>
    )
}