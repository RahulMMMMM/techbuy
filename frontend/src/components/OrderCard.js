import { Link } from "react-router-dom";

export default function OrderCard(props){

    const order = props.order;
    console.log(order)
    console.log(order.order_date)

    const dateObject = new Date(order.order_date);

    const formattedDate = dateObject.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return(
        <div className="order-card-container">
            <div className="order-card-header">
                <p>{formattedDate}</p>
            </div>
            <div className="order-card-body">
                <h2>{order.order_status}</h2>
                <div className="order-products">
                    {
                        order.product_list.map((product)=>{
                            return(
                                <div className="order-product-details">
                                    <img src={product.image_src}/>
                                    <Link to={`/product?id=${product._id}`} >{product.title}</Link>
                                </div>
                            )
                        })
                    }
                <a href="">Archive Order</a>
                </div>
            </div>
        </div>
    )

}

