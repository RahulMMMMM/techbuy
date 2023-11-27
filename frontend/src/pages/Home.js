import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Home() {

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4000/products").then((response) => {
        setProducts(response.data);
      })
},[]);


  return (
    <>
      <div className="home-container">
        <div className="product-container"> 
          {products.map((product)=>{
            return(
              <ProductCard key={product.stripe_id} image={product.image_src} title={product.title} rating={product.rating} price={product.price}  id={product.stripe_id}  />
            );
          })}
        </div>
      </div>
    </>
  );
}
