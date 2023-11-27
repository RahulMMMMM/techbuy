import { useContext } from "react";
import axios from 'axios'
import { AuthContext } from "../Context/AuthContext";

const useRefreshToken = () => {
    const {setAuth} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('localhost:4000/refresh');
        setAuth(prev=>{
            return {...prev, accessToken:response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;