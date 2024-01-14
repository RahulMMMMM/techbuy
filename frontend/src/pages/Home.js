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
      <div className="basic-container">
        <div className="product-container"> 
          {products.map((product)=>{
            return(
              <ProductCard key={product.id} image={product.image_src} title={product.title} rating={product.rating} price={product.price}  stripe_id={product.stripe_id} id={product._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}
