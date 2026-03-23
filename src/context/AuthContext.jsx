import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";
import axios from "axios";

export const AuthContext = createContext({});


function AuthContextProvider({children}){

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();
    const [member, setMember] = useState([]);

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            if(isTokenValid(decoded)) {
                checkAuth();
            } else {
                toggleAuth( {
                    ...auth,
                    status: 'done',
                });
            }
        } else {
            toggleAuth({
                ...auth,
                status: 'done',
            });
        }
    }, []);



    async function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        toggleAuth({
            isAuth: true,
            status: 'done',
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles,
            },
        });
        await checkAuth();
        navigate('/account');
        console.log("Gebruiker is ingelogd");
    }

    function logout() {
        localStorage.removeItem('token');
        toggleAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate('/');
        console.log("Gebruiker is uitgelogd");

    }

    async function checkAuth(){
        const jwtToken = localStorage.getItem('token');
        const decoded = jwtDecode(jwtToken);
        const userId = decoded.userId;

        try {

            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            toggleAuth({
                isAuth: true,
                user: response.data,
                status: 'done',
            });

            const memberResponse = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}/members`,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("userResponse: ", response.data)
            console.log("MemberResponse: ", memberResponse.data);
            setMember(memberResponse.data);





        } catch (e) {
            console.error('Full error:', e.response);
            // console.error(e);
            toggleAuth({
                isAuth: false,
                user: null,
                status: 'done',

            });
        }
    }

    const data = {
        authentication: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
        member: member,

    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )


}

export default AuthContextProvider;