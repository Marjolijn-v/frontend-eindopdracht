import './Login.css'
import userIcon from '../../assets/icons/user-icon.png'
import lockIcon from '../../assets/icons/lock-icon.png'
import React from 'react';
import HeroSection from "../../components/heroSection/heroSection.jsx";
import {useForm} from "react-hook-form";
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import Button from "../../components/button/button.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


function Login() {
    const { handleSubmit, formState:{ errors}, register } = useForm();
    // const navigate = useNavigate();

    async function handleFormSubmit(data) {
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3'
                }
            });
            console.log("inloggen is gelukt", response.data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <HeroSection>
                <h1>Welcome back!</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="input-wrapper">
                        <img src={userIcon} alt="User icon" className="input-icon"/>
                        <InputComponent
                            className="login-input username-field"
                            inputType="text"
                            inputName="username"
                            inputId="username-field"
                            placeholder="Username"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: 'Username is required',
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
                        title="Login"
                        // onclick={() => navigate('/account')}

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

