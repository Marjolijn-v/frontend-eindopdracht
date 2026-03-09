import React, {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});


function AuthContextProvider({children}){

    const [auth, toggleAuth] = useState({
        isAuth: false,
    });
    const navigate = useNavigate();

    function login(){
        toggleAuth({
            isAuth: true,
        });
        navigate('/account');
        console.log("Gebruiker is ingelogd");
    }

    function logout() {
        toggleAuth({
            isAuth: false,
        });
        navigate('/');
        console.log("Gebruiker is uitgelogd");

    }

    const data = {
        authentication: auth.isAuth,
        login: login,
        logout: logout,

    }

    return (
        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>
    )


}

export default AuthContextProvider;