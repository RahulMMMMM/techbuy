import { useSearchParams } from "react-router-dom";
import axios from "../api/Axios";
import { useContext,useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";

export default function Order() {
    const [customer,setCustomer] = useState({});
    const [queryParams] = useSearchParams();
    const [success,setSuccess] = useState(false);

    const cart = useContext(CartContext);
    
    

    useEffect(()=>{
        const fetchCustomer = async ()=>{
            var responsed;

            try{
              const session_id = queryParams.get("session_id");
              const response = await axios.get(`order/success?session_id=${session_id}`,{
                headers: {
                  'Content-Type': 'application/json',
                  
                },
            
              });
              const products = response?.data?.lineItems.data
              const customerData = response?.data?.customer;
              setCustomer(customerData);
              const total = response?.data?.total;
              const orderNumber = session_id.slice(8);
              
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
        <h2>Thank you {customer.name}, your order has been placed.</h2>
      </div>
    );
}
  