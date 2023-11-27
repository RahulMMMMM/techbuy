import axios from "axios";

export const useGetAllProducts = async () =>{
    try {
        const response = await axios.get('http://localhost:4000/products');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

