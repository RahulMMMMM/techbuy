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
    

    return(
        <div>
            <div>
                <img src={product.image_src} />
            </div>
            <div>
            
            </div>
        </div>
    )
}

