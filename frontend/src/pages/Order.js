import { useSearchParams } from "react-router-dom";
import axios from "../api/Axios";
import { useContext,useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import OrderCard from "../components/OrderCard";

export default function Order() {
    const [customer,setCustomer] = useState({});
    const [queryParams] = useSearchParams();
    const [success,setSuccess] = useState(false);
    const [order,setOrder] = useState({});

    const cart = useContext(CartContext);
    
    

    useEffect(()=>{
        const fetchCustomer = async ()=>{
            var responsed;
            const session_id = queryParams.get("session_id");
            const orderNumber = session_id.slice(8);
            try{
              const response = await axios.get(`/orders/get-session-id?session_id=${session_id}`,{
                headers: {
                  'Content-Type': 'application/json',
                  
                },
            
              });
              const products = response?.data?.lineItems.data
              const customerData = response?.data?.customer;
              setCustomer(customerData);
              const total = response?.data?.total;
              
              
              try{
                   responsed = await axios.post('orders/create-order',
                    {
                      products,
                      address: customerData.address,
                      email: customerData.email,
                      total,
                      orderNumber
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        
                      },
                      withCredentials: true
                    }
                  )
                  const order= responsed?.data?.order;
                 
                  setOrder(order);
                
                  
              }
              catch(err){
                console.log(err);
              }
            }
            catch(err){
              console.log(err);
            }
            if(responsed?.data?.message==='Order Successful'){
              setSuccess(true)
            }
            else{
              try{
                const response = await axios.get(`/orders/get-order?order_number=${orderNumber}`,{
                  headers: {
                    'Content-Type': 'application/json',
                    
                  },
                  withCredentials: true
              
                });

                const order = response.data.order;
                
                setOrder(order);
              }
              catch(err){
                console.log(err)
              }
            }
        }

        

        fetchCustomer();
    },[])

  useEffect(()=>{
    if(success){
      cart.clearCart();
    }
  })

    return (
      <div className="confirmed-container">
        <h1>Order Confirmation</h1>
        <h2>Order Number: {}</h2>
        <h2>Thank you {customer.name}, your order has been placed.</h2>
        {
          order.product_list !== undefined ? (<OrderCard order={order}/>) : <h1>Order cannot be displayed</h1>
        }
      </div>
    );
}
  