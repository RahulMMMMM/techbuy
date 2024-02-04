import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/Axios";


export default function Addresses() {
    const [addresses,setAddresses] = useState([]);

    useEffect(()=>{
        const getAddies = async () =>{
          try{
            const response = await axios.get('/auth/get-addresses',
            {
              headers: {
                'Content-Type': 'application/json',
                
              },
              withCredentials: true
            })
            console.log(response.data.addresses)
            setAddresses(response.data.addresses);
          }
          catch(err){
            console.log(err)
          }
        }
        getAddies();
    },[])


    return (
      <div className="add-container" >
        <h1>Your Addresses</h1>
        <div className="add2-container">
          <Link to="add-address"><button className="new-address">Add address</button></Link>
          {addresses.map((address)=>{
            return(
              <div className="new-address">
                <p>{address.country}</p>
                <p>{address.state}</p>
                <p>{address.addressLine}</p>
                <p>{address.city}</p>
                <p>{address.zipCode}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
}
  