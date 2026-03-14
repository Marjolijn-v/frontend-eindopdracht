import './Login.css'
import lockIcon from '../../assets/icons/lock-icon.png'
import emailIcon from '../../assets/icons/email-icon.png'
import React, {useContext, useState} from 'react';
import HeroSection from "../../components/heroSection/heroSection.jsx";
import {useForm} from "react-hook-form";
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import Button from "../../components/button/button.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";


function Login() {
    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const { handleSubmit, formState:{ errors}, register } = useForm();
    const navigate = useNavigate();


    async function handleFormSubmit(data) {
        try {
            setError('');
            toggleLoading(true);
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3'
                }
            });
            console.log("inloggen is gelukt", response.data);
            login(response.data);

        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || 'Something went wrong, please try again.');
        } finally {
            toggleLoading(false);
        }
    }



    return (
        <>
            {error && <p className="error-text">{error}</p>}

            <HeroSection>
                <h1>Welcome back!</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="input-wrapper">
                        <img src={emailIcon} alt="Email icon" className="input-icon"/>
                        <InputComponent
                            className="login-input email-field"
                            inputType="email"
                            inputName="email"
                            inputId="email-field"
                            placeholder="Email Address"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: 'Email Address is required',
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="input-wrapper">
                        <img src={lockIcon} alt="Lock icon" className="input-icon "/>
                        <InputComponent
                            className="login-input password-field"
                            inputType="password"
                            inputName="password"
                            inputId="password-field"
                            placeholder="Password"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="button-wrapper">
                        <Button
                        className="login-button"
                        type="submit"
                        title={loading ? "Logging in..." : "Login"}
                        disabled={loading}
                        onclick={() => navigate('/account')}

                    />
                    </div>

                </form>
                <div className="text-wrapper">
                    <p className="login-sub-text">New to Leaf Switch? Please make an account <Link to="/register"><strong> here </strong></Link> so you can start switching!</p>
                </div>

            </HeroSection>


        </>
    );
}

export default Login;

