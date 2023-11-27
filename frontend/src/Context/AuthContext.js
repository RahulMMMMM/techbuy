import {createContext , useState, useEffect} from 'react';

export const AuthContext = createContext({});




export const AuthContextProvider = ({children}) => {
    const [auth,setAuth] = useState({});

    const [authInfo,setAuthInfo] = useState({});

    useEffect(() => {
        const authData = localStorage.getItem("cart");
        if(authData){
            setAuthInfo(JSON.parse(authData));
        }
        
    }, []);
    
    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify({
            "firstname": auth.firstname,
            "email": auth.email
        }));
    }, [auth]);

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    ) 
}



