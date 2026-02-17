import './navBar.css';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../button/button.jsx";
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/icons/search-icon.png'

function NavBar() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    return(


        <nav>
            <Link to="/">
                <span className="logo-container">
                    <img className="logo" src={logo} alt="logo"/>
                </span>
            </Link>

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
                <Button
                    type="button"
                    title="Login/Sign Up"
                    onclick={() => navigate('/login')}
                />

                <Button
                    type="button"
                    title="Switch your Leafs!"
                    onclick={() => navigate('/account')}
                />
            </div>
        </nav>
    );
}

export default NavBar;
