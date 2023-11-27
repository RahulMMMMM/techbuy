import axios from "axios";

export const useGetProduct = async (id) =>{

    const url = 'http://localhost:4000/products/product';
    const data = {
        id: 'price_1O3h0rB4WKiOZKxWJVHYOqrq'
    };

    try {
        const response = await axios.get(url, data
        );

  
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return {};
    }
}