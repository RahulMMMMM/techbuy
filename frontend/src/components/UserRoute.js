import { useEffect, useState} from "react";
import axios from "../api/Axios";
import { Outlet, useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    const navigate = useNavigate();
    const AUTH_URL = '/auth/current-user';
    const [ok,setOk] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await axios.get(AUTH_URL,
                {
                    withCredentials: true
                }
            );
            if(response?.data?.ok){
                setOk(true);
            }
            else{
                navigate('/login')
            }
        } catch (err) {
            navigate('/login')
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return ok ? <Outlet /> : '';
};

export default UserRoute;