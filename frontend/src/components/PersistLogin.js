import { Outlet } from 'react-router-dom';
import { useState,useEffect, useContext } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { AuthContext } from '../Context/AuthContext';

const PersistLogin = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth}=useContext(AuthContext);

    useEffect(()=>{
        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }
            catch (err){
                console.error(err);
            }
            finally{
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    },[])

    useEffect(()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return(
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin;