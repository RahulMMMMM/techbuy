

export default function Footer(){

    return(
        <div className="footer-container">
            <div className="footer-info-container">
                <div>
                    <strong>Get to Know Us</strong>
                    <ul>
                        <li><a >About us</a></li>
                        <li><a>TechBuy Newsletter</a></li>
                        <li><a>Accessibility</a></li>
                        <li><a>Sustainibility</a></li>
                    </ul>
                </div>
                <div>
                    <strong>Order & Purchases</strong>
                    <ul>
                        <li><a>Check Order Status</a></li>
                        <li><a>Shipping, Delivery & Pickup</a></li>
                        <li><a>Returns & Exchanges</a></li>
                        <li><a>Price Match Guarantee</a></li>
                    </ul>
                </div>
                <div>
                    <strong>Support & Services</strong>
                    <ul>
                        <li><a>Visit our Support Center</a></li>
                        <li><a>Shop with an Expert</a></li>
                        <li><a>Protection & Support Plans</a></li>
                        <li><a>Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-company" > 
                <div>
                    <a><h6>Terms & Conditions</h6></a>
                    <a><h6>Privacy Policy</h6></a>
                    <a><h6>Don't Sell My Info</h6></a>
                </div>
                <div>
                    <h6>© Techbuy.com, Inc, and other affiliates</h6>
                </div>
            </div>
        </div>
        
    )
}