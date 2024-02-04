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
                    <h4 onChange={(e)=>{setAddress({...address,country:e.target.value})}}>Country</h4>
                    <select>
                        <option value="US">United States</option>
                        
                    </select>
                    <h4>Address Line</h4>
                    <input  type="text" onChange={(e)=>{setAddress({...address,addressLine:e.target.value})}} />
                    <h4>City</h4>
                    <input type="text" onChange={(e)=>{setAddress({...address,city:e.target.value})}} />
                    <h4>State</h4>
                    <select onChange={(e)=>{setAddress({...address,state:e.target.value})}} >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <h4>Zip Code</h4>
                    <input type="text" onChange={(e)=>{setAddress({...address,zipcode:e.target.value})}} />
                    <button type="submit">Submit</button>
        </form>

      </div>
    );
}
  