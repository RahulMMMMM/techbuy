import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState } from "react";
import {CartContext} from "../CartContext";




export default function ProductCard({image,title,rating,price,id}){

    const cart = useContext(CartContext);

    return(
        <div className="card-container">
            <img className="card-image" src={image} />
            <a className="card-name" href="">{title}</a>
            <Rating size="small" defaultValue={rating} precision={0.5} readOnly/>
            <h1 className="card-price">{"$"+price}</h1>
            <button className="atc-button" onClick={()=>{cart.addOneToCart(id)}} ><ShoppingCartIcon/><h3>Add to Cart</h3></button>
        </div>

    )
}