import { useEffect, useState} from "react"
import axios from "../api/Axios";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    const fetchOrders = async ()=>{
      try{
        const response = await axios.get('/orders/get-orders',
        {
          headers: {
            'Content-Type': 'application/json',
            
          },
          withCredentials: true
        })
        const orderdata= response?.data?.orders;
        console.log(orderdata)
        setOrders(orderdata)
      }
      catch(err){
        console.log(err)
      }
    }

    fetchOrders();
  },[])

  return (
     <div className="order-container">
        <h1>Your orders</h1>
        <hr />
        <div className="order-cards-container">
        {
          orders.map((order)=>{
            return(
              <OrderCard order={order} />
            )
          })
        }
        </div>
        
     </div>
  );
}
  