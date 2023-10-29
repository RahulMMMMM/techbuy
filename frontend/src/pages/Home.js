import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from 'axios';

export default function Home() {

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4000/products")
    .then((res)=>{
      console.log(res.data)
      setProducts(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[]);


  return (
    <>
      <div className="home-container">
        <div className="product-container"> 
          {products.map((product)=>{
            return(
              <ProductCard image={product.product_image_src} title={product.product_title} rating={product.product_rating} price={product.product_price}  id={product.product_id}  />
            );
          })}
        </div>
      </div>
    </>
  );
}
