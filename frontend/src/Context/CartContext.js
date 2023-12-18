import { createContext, useState, useEffect } from "react";
import axios from '../api/Axios';



export const CartContext = createContext({
    cart: [],
    saved: [],
    email: "",
    getProductQuantity: ()=>{},
    addOneToCart: ()=>{},
    removeOneFromCart: ()=>{},
    deleteFromCart: ()=>{},
    getCartTotal: ()=>{},
    changeQuantity: ()=>{},
    deleteFromSaved: ()=>{},
    moveToCart: ()=>{},
    saveForLater: ()=>{},
    changeEmail: ()=>{},
    changeCart:()=>{}
});




export default function CartProvider({children}) {

    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [saved, setSaved] = useState([]);
    const [email,setEmail] = useState("");

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

    useEffect(() => {
        const fetchCart= async()=>{
            try{
                const response = await axios.get('/auth/get-info?info=cart',
                
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                
                });
                setCart(response?.data?.cart);
            }
            catch(err){
                console.log(err);
            }
        }

        const emailData = localStorage.getItem("email");
        if(emailData){
            setEmail(JSON.parse(emailData));
            fetchCart();
        }
        
    }, []);

    useEffect(()=>{
        localStorage.setItem("email", JSON.stringify(email));
    },[email]);
    

    useEffect(()=>{
        axios.get("http://localhost:4000/products").then((response) => {
            setData(response.data);
          })
    },[]);

    async function addOneToCart(id){
        const quantity = getProductQuantity(id)
        const product = data.find(product=>product._id===id)
        if(quantity===undefined){
            const newCart = [...cart,{
                ...product,
                quantity:1
            }];
            setCart(newCart);
            changeCartDb(newCart);
        }
        else{
            const newCart = cart.map((product)=>{
                    product.quantity = product._id === id ? product.quantity+1 : product.quantity;
                    return product;})
            
            setCart(prev=>newCart);

            changeCartDb(newCart);
            
            
        }

    }  
    
    function addMultipleToCart(id,quantity){
        const product = data.find(product=>product._id===id)
        const prodQuantity = getProductQuantity(id)
        if(prodQuantity===undefined){
            const newCart =[...cart,{
                ...product,
                quantity:quantity
            }];

            setCart(newCart);
            changeCartDb(newCart);
        }
        else{
            const newCart = cart.map((product)=>{
                    product.quantity = product._id === id ? product.quantity+quantity : product.quantity;
                    return product;
            
            })

            setCart(prev=>newCart);
            changeCartDb(newCart);
            
        }

    }
     

    function removeOneFromCart(id){
        if(getProductQuantity(id)>0){
            cart.find((product)=>{
                product.quantity = product._id === id ? product.quantity-1 : product.quantity;
            })
            changeCartDb(cart);
        }
        else{
            deleteFromCart(id);
            changeCartDb(cart);
        }
    }

    function deleteFromCart(id){
        const newCart = cart.filter((product)=>{
            return product._id !== id;
        });

        setCart(newCart);
        changeCartDb(newCart);
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

    function changeEmail(email){
        setEmail(email);
    }

    async function changeCartDb(newCart){
        
        try{
            const result = await axios.post("/auth/update-cart",
            {email,newCart},
            {
                headers: { 'Content-Type': 'application/json' }
            }
         );
        }
        catch(err){
            console.log(err);
        } 

    }

    function changeCart(newCart){
        setCart(newCart);
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
        saveForLater,
        changeEmail,
        changeCart
    }

    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}