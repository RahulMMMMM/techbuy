import { Link } from "react-router-dom";


export default function Payments() {
    return (
      <div className="add-container" >
        <h1>Your Addresses</h1>
        <Link to="add-payment"><button className="new-address">Add payment</button></Link>
      </div>
    );
}
  