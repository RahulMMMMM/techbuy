import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/Axios";


export default function ChangeAddress() {
    const [address,setAddress] = useState({country:"US",state:"AL"});
    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = axios.post('auth/add-address',{address:address},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                   
                }
            )

            navigate('/myaccount/addresses');

        }
        catch(err){
            console.log(err)
        }
    }


    return (
      <div className="change-address-container">
        <h1>Add a New Address</h1>
        <form className="address-form" onSubmit={handleSubmit}>
                
                    <button type="submit">Submit</button>
        </form>

      </div>
    );
}
  