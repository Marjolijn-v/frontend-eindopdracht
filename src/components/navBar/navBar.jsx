import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../button/button.jsx";
import logo from '../../assets/logo.png'

function NavBar() {
    const navigate = useNavigate();

    return(
        <nav>
            <Link to="/">
                <span className="logo-container">
                    <img src={logo} alt="logo"/>
                </span>
            </Link>

            <div>
                <Button
                    type="button"
                    title="Login/Register"
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
