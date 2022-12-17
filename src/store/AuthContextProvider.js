import React, { useState } from 'react';
import AuthContext from './AuthContext';
const AuthContextProvider = (props) =>{
    const initialtoken = localStorage.getItem('token');
    const [token,setToken] = useState(initialtoken);
    const userIsLoggedIn = !!token;
    //this simply converts this truthy or falsy value to a true or false Boolean value. 
    //If token is a string that's not empty, this will return true,if token is a string that is empty, this will return false.
    const loginHandler = (idToken) =>{
        setToken(idToken);
        localStorage.setItem('token',idToken);
    }
    const logoutHandler= () =>{
        setToken(null);
        localStorage.removeItem('token');
    }
const authcontext={
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout :logoutHandler
}
return (
    <AuthContext.Provider value={authcontext}>
        {props.children}
    </AuthContext.Provider>
)

}
export default AuthContextProvider;