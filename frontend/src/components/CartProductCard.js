import { CartContext } from "../Context/CartContext"
import { useContext } from "react"

export default function CartProductCard(props){

    const cart = useContext(CartContext);
    return(
        <div className="cart-product-card-container">
            <img src={props.image} className="cart-product-image" />
            <a className="cart-product-title" href="" >{props.title}</a>
            <div className="quantity-form" >
                {/* <select onChange={(event)=>cart.changeQuantity(props.id,event.target.value)} >
                    <option value={1} selected={1===props.quantity? "selected" : ""} >1</option>
                    <option value={2} selected={2===props.quantity? "selected" : ""} >2</option>
                    <option value={3} selected={3===props.quantity? "selected" : ""}>3</option>
                    <option value={4} selected={4===props.quantity? "selected" : ""}>4</option>
                    <option value={5} selected={5===props.quantity? "selected" : ""}>5</option>
                </select> */}
                <button onClick={()=>cart.deleteFromCart(props.id)} >Remove</button>
            </div>
            <h2>Quantity: {cart.getProductQuantity(props.id)}</h2>
            <h2 className="cart-product-price" >${props.price}</h2>
        </div>
    )

}

