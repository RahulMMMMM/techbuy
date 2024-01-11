import {createContext , useState, useEffect} from 'react';


export const AuthContext = createContext({
    auth: {},
    setAuthInfo: ()=>{},
    deleteAll: ()=>{}
});


export const AuthContextProvider = ({children}) => {
    const [auth,setAuth] = useState({});

    useEffect(() => {
        const authData = localStorage.getItem("authData");
        if(authData){
            setAuth(JSON.parse(authData));
        }
        
    }, []);
    
    useEffect(() => {
        localStorage.setItem("authData", JSON.stringify({
            "firstname": auth.firstname,
            "email": auth.email,
            "lastname":auth.lastname
        }));
    }, [auth]);

    function setAuthInfo(email,firstname,lastname){
        setAuth({
            email: email,
            firstname: firstname,
            lastname: lastname
        })
    }

    function deleteAll(){
        setAuth({});
        localStorage.removeItem("authData");
    }

    return(
        <AuthContext.Provider value={{auth,setAuthInfo,deleteAll}}>
            {children}
        </AuthContext.Provider>
    ) 
}



