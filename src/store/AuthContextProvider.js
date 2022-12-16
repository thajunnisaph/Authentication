import React, { useState } from 'react';
import AuthContext from './AuthContext';
const AuthContextProvider = (props) =>{
    const [token,setToken] = useState(null);
    const userIsLoggedIn = !!token;
    //this simply converts this truthy or falsy value to a true or false Boolean value. 
    //If token is a string that's not empty, this will return true,if token is a string that is empty, this will return false.
    const loginHandler = (idToken) =>{
        setToken(idToken);
        console.log(token);
    }
    const logoutHandler= () =>{
        setToken(null);
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