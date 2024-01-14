import { useState,useEffect } from "react";
import axios from "../api/Axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function SearchResult() {
    const [products,setProducts] = useState([]);
    const [queryParams] = useSearchParams();

    const query = queryParams.get("k");

    useEffect(()=>{
        axios.get(`http://localhost:4000/products/search?k=${query}`).then((response) => {
            setProducts(response.data.products);
        })
    },[]);


    return (
        <div className="basic-container">
        <div className="product-container"> 
          {products.map((product)=>{
            return(
              <ProductCard key={product.id} image={product.image_src} title={product.title} rating={product.rating} price={product.price}  stripe_id={product.stripe_id} id={product._id} />
            );
          })}
        </div>
      </div>
    );
}
  