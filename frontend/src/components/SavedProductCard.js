import { CartContext } from "../Context/CartContext"
import { useContext } from "react"

export default function SavedProductCard(props){

    const cart = useContext(CartContext);
    return(
        <div className="cart-product-card-container">
            <img src={props.image} className="cart-product-image" />
            <a className="cart-product-title" href={`/product?id=${props.id}`} >{props.title}</a>
            <div className="quantity-form" >
                <button onClick={()=>cart.deleteFromSaved(props.id)} >Remove</button>
                <button onClick={()=>cart.moveToCart(props.id,props.quantity)} >Move to Cart</button>
            </div>
            <h2 className="cart-product-price" >${props.price}</h2>
        </div>
    )

}

