import {createContext, useReducer, useState} from 'react';

export const AuthContext = createContext({});



export const AuthContextProvider = ({children}) => {
    const [auth,setAuth] = useState({});


    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    ) 
}



/* 
export const authReducer = (state,action) =>{
    switch (action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

const [state, dispatch] = useReducer(authReducer, {
    user:null
}) */