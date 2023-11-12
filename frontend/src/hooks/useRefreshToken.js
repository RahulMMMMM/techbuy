import { useContext } from "react";
import useAuth from "./useAuth";

const useAuth = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh');
        setAuth(prev=>{
            return {...prev, accessToken:response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;