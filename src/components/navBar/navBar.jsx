import './navBar.css';
import React, {useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../button/button.jsx";
import logo from '../../assets/logo.png';

import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const navigate = useNavigate();


    const {authentication, logout} = useContext(AuthContext);

    return(


        <nav>
            <Link to="/">
                <span className="logo-container">
                    <img className="logo" src={logo} alt="logo"/>
                </span>
            </Link>
            {/*{console.log(authentication)}*/}


            <div>
                <Button
                    type="button"
                    title="Search plants"
                    onClick={() => navigate('/search')}
                />

                {authentication ? (
                    <Button
                        type="button"
                        title="Log out"
                        onClick={logout}
                    />
                ) : (
                    <Button
                        type="button"
                        title="Login/Sign Up"
                        onClick={() => navigate('/login')}
                    />
                )}


                {authentication ? (
                    <Button
                        type="button"
                        title="My account"
                        onClick={() => navigate('/account')}

                    />
                ) : (
                    <Button
                        type="button"
                        title="Switch your Leafs!"
                        onClick={() => navigate('/login')}
                    />

                )}
            </div>
        </nav>
    );
}

export default NavBar;
