import './navBar.css';
import React, {useContext, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../button/button.jsx";
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/icons/search-icon.png'
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const {authentication, logout} = useContext(AuthContext);

    return(


        <nav>
            <Link to="/">
                <span className="logo-container">
                    <img className="logo" src={logo} alt="logo"/>
                </span>
            </Link>
            {console.log(authentication)}

            <div className="search-field">
                <div className="input-wrapper search-field">

                    <img src={searchIcon} alt="Search icon" className="search-icon"/>

                <input type="text"
                       name="search"
                       id="search-field"
                       value={inputValue}
                       placeholder="Search"
                       onChange={(e) => setInputValue(e.target.value)}
                       // onKeyDown={(e) => e.key === "Enter" && searchPlants()}
                />
                </div>

            </div>

            <div>

                {authentication ? (
                    <Button
                        type="button"
                        title="Log out"
                        onclick={logout}
                    />
                ) : (
                    <Button
                        type="button"
                        title="Login/Sign Up"
                        onclick={() => navigate('/login')}
                    />
                )}


                <Button
                    type="button"
                    title="Switch your Leafs!"
                    onclick={authentication ? (() => navigate('/account')) : (() => navigate('/login')) }
                />
            </div>
        </nav>
    );
}

export default NavBar;
