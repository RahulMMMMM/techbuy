import { createContext, useState, useEffect } from "react";
import data from '../data.json';

export const CartContext = createContext({
    cart: [],
    getProductQuantity: ()=>{},
    addOneToCart: ()=>{},
    removeOneFromCart: ()=>{},
    deleteFromCart: ()=>{},
    getCartTotal: ()=>{},
    changeQuantity: ()=>{}
});




export default function CartProvider({children}) {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if(cartData){
            console.log(JSON.parse(cartData));
            setCart(JSON.parse(cartData));
        }
        
    }, []);
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function getProductQuantity(id){
        const total = cart.find(product=>product.id===id)?.quantity;
        return total;
    }

    function addOneToCart(id){
        const quantity = getProductQuantity(id)
        const product = data.find(product=>product.id===id)
        console.log(quantity)
        console.log(product)
        if(quantity==undefined){
            setCart([...cart,{
                ...product,
                quantity:1
            }]);
            
        }
        else{
            setCart((prev)=>{
                return cart.map((product)=>{
                    product.quantity = product.id === id ? product.quantity+1 : product.quantity;
                    return product;
                })
            })
            
        }

    }    

    function removeOneFromCart(id){
        if(getProductQuantity(id)>0){
            cart.map((product)=>{
                product.quantity = product.id === id ? product.quantity-1 : product.quantity;
            })
        }
        else{
            deleteFromCart(id);
        }
    }

    function deleteFromCart(id){
        setCart(cart.filter((product)=>{
            return product.id !== id;
        }));
    }

    function getCartTotal(){
        const cartTotal = cart.reduce((sum, product)=> sum + (product.price*product.quantity),0);
        return cartTotal;
    }

    function changeQuantity(id,quantity){
        setCart((prev)=>{
            return cart.map((product)=>{
                product.quantity = product.id === id ? quantity : product.quantity;
                return product;
            })
        })
    }

    const contextValue = {
        cart,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getCartTotal,
        changeQuantity
    }

    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}