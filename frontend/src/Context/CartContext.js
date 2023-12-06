import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext({
    cart: [],
    saved: [],
    getProductQuantity: ()=>{},
    addOneToCart: ()=>{},
    removeOneFromCart: ()=>{},
    deleteFromCart: ()=>{},
    getCartTotal: ()=>{},
    changeQuantity: ()=>{},
    deleteFromSaved: ()=>{},
    moveToCart: ()=>{},
    saveForLater: ()=>{}
});




export default function CartProvider({children}) {

    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if(cartData){
            setCart(JSON.parse(cartData));
        }
        
    }, []);
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function getProductQuantity(id){
        const total = cart.find(product=>product._id===id)?.quantity;
        return total;
    }

    useEffect(() => {
        const savedData = localStorage.getItem("saved");
        if(savedData){
            setSaved(JSON.parse(savedData));
        }
        
    }, []);
    
    useEffect(() => {
        localStorage.setItem("saved", JSON.stringify(saved));
    }, [saved]);


    useEffect(()=>{
        axios.get("http://localhost:4000/products").then((response) => {
            setData(response.data);
          })
    },[]);

    function addOneToCart(id){
        const quantity = getProductQuantity(id)
        const product = data.find(product=>product._id===id)
        if(quantity===undefined){
            setCart([...cart,{
                ...product,
                quantity:1
            }]);
            
        }
        else{
            setCart((prev)=>{
                return cart.map((product)=>{
                    product.quantity = product._id === id ? product.quantity+1 : product.quantity;
                    return product;
                })
            })
            
        }

    }  
    
    function addMultipleToCart(id,quantity){
        const product = data.find(product=>product._id===id)
        const prodQuantity = getProductQuantity(id)
        if(prodQuantity===undefined){
            setCart([...cart,{
                ...product,
                quantity:quantity
            }]);
        }
        else{
            setCart((prev)=>{
                return cart.map((product)=>{
                    product.quantity = product._id === id ? product.quantity+quantity : product.quantity;
                    return product;
                })
            })
            
        }

    }
     

    function removeOneFromCart(id){
        if(getProductQuantity(id)>0){
            cart.find((product)=>{
                product.quantity = product._id === id ? product.quantity-1 : product.quantity;
            })
        }
        else{
            deleteFromCart(id);
        }
    }

    function deleteFromCart(id){
        setCart(cart.filter((product)=>{
            return product._id !== id;
        }));
    }

    function getCartTotal(){
        const cartTotal = cart.reduce((sum, product)=> sum + (product.price*product.quantity),0);
        return cartTotal;
    }

    function changeQuantity(id,quantity){
        setCart((prev)=>{
            return cart.map((product)=>{
                product.quantity = product._id === id ? quantity : product.quantity;
                return product;
            })
        })
    }

    function getCartQuantity(){
        return cart.reduce((sum, product)=> sum + product.quantity,0);
    }

    function addToSaved(id,quantity){      
        const product = saved.find((product)=>product._id===id);
        if(product===undefined){
            const productInfo = data.find(product=>product._id===id)

            setSaved([...saved,{
                ...productInfo,
                quantity:quantity
            }]);
            
        }
        else{
            setSaved((prev)=>{
                return saved.map((product)=>{
                    product.quantity = product._id === id ? quantity : product.quantity;
                    return product;
                })
            })
            
        }

    }

    function deleteFromSaved(id){
        setSaved(saved.filter((product)=>{
            return product._id !== id;
        }));
    }
    
    function moveToCart(id,quantity){
        console.log(quantity)
        addMultipleToCart(id,quantity);
        deleteFromSaved(id);
    }

    function saveForLater(id,quantity){
        addToSaved(id,quantity);
        deleteFromCart(id);
    }

    const contextValue = {
        cart,
        saved,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getCartTotal,
        changeQuantity,
        getCartQuantity,
        deleteFromSaved,
        moveToCart,
        saveForLater
    }

    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}