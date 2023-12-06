import { useContext, useEffect, useState } from "react";
import {CartContext} from "../Context/CartContext";
import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";


export default function ProductPage(){
    const cart = useContext(CartContext);
    const [product,setProduct] = useState({});

    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get('id');


    useEffect(()=>{
        axios.get("http://localhost:4000/products/product",{params: {id:id}}, {headers: { 'Content-Type': 'application/json' }}).then((response) => {
            setProduct(response.data);
          })
    },[]);
    
    console.log(typeof product.rating) //logs number

    return(
        <div className="product-page-container">
            <div className="product-container" >
                
                <div className="product-image-container">
                    <img src={product.image_src} className="product-image" />
                </div>
                <div className="product-info" >
                    <h2 style={{marginBottom:"10px"}}>{product.title}</h2>
                    <Rating size="small" value={product.rating ? product.rating:5} precision={0.5} readOnly/>
                    <h1 style={{}}>${product.price}</h1>
                    <button className="atc-button" onClick={()=>{cart.addOneToCart(id)}} ><ShoppingCartIcon/><h3>Add to Cart</h3></button>
                </div>
            </div>
        </div>
    )
}

