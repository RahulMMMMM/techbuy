import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState } from "react";
import {CartContext} from "../Context/CartContext";
import { Link } from "react-router-dom";




export default function ProductCard({image,title,rating,price,id}){

    const cart = useContext(CartContext);

 
    return(
        <div className="card-container">
            <img className="card-image" src={image} />
            <Link className="card-name" to={`/product?id=${id}`} >{title}</Link>
            <Rating size="small" defaultValue={rating} precision={0.5} readOnly/>
            <h1 className="card-price">{"$"+price}</h1>
            <button className="atc-button" onClick={()=>{cart.addOneToCart(id)}} ><ShoppingCartIcon/><h3>Add to Cart</h3></button>
        </div>

    )
}