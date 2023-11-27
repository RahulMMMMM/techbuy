import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext({
    products:[],
    findProduct:()=>{},


});



export default function ProductProvider({children}) {

    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () =>{
            const productsData = await getAllProducts();
            setProducts(productsData);
            setLoading(false);
        }

        fetchProducts();
        
    },[]);
    
    


    const findProduct = async (id) =>{
        console.log(products);
    
        const product = products.find((product) => product.id === "price_1O3h05B4WKiOZKxWMuB1qlPk");
        console.log(products);
        console.log(product)
    }

    const getAllProducts = async () =>{
        try {
            const response = await axios.get('http://localhost:4000/products');
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    const contextValue= {
        products,
        findProduct,
        
    }

    return(
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}