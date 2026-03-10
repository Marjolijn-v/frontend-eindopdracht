import './Register.css'
import React from 'react';
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import userIcon from "../../assets/icons/user-icon.png";
import lockIcon from "../../assets/icons/lock-icon.png";
import emailIcon from "../../assets/icons/email-icon.png";
import locationIcon from "../../assets/icons/location-icon.png"
import Button from "../../components/button/button.jsx";
import HeroSection from "../../components/heroSection/heroSection.jsx";
import axios from "axios";

function Register() {
    const { handleSubmit, formState:{ errors}, register } = useForm();
    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        console.log(data);
        try {
            const userResponse = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                email: data.email,
                password: data.password,
                roles: [
                    'user'
                ],
            }, {
                headers: {
                    'novi-education-project-id' : '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    'Content-Type': 'application/json',
                }
            });

            const userId = userResponse.data.id;

            const memberResponse = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/members', {
                userId: userId,
                name: data.username,
                location: data.location,
            }, {
                headers: {
                    'novi-education-project-id' : '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    'Content-Type': 'application/json',
                }
            });

            console.log(userResponse.data, memberResponse.data);


        } catch (e) {
            console.error(e);
        }
    }
    return(
        <>
            <HeroSection>
            <div className="register-header">
                <h1>Welcome to Leaf Switch!</h1>
                <p>Create your new account here and start switching.</p>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="input-wrapper">
                    <img src={userIcon} alt="User icon" className="input-icon"/>
                    <InputComponent
                        className="register-input username-field"
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
                    <img src={emailIcon} alt="Email icon" className="input-icon"/>
                    <InputComponent
                        className="register-input email-field"
                        inputType="email"
                        inputName="email"
                        inputId="email-field"
                        placeholder="Email address"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Email address is required',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className="input-wrapper">
                    <img src={locationIcon} alt="location icon" className="input-icon"/>
                    <InputComponent
                        className="register-input location-field"
                        inputType="text"
                        inputName="location"
                        inputId="location-field"
                        placeholder="Location"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Location is required',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className="input-wrapper">
                    <img src={lockIcon} alt="Lock icon" className="input-icon "/>
                    <InputComponent
                        className="register-input password-field"
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

                <div className="input-wrapper">
                    <InputComponent
                        className="register-input radio-newsletter"
                        inputType="radio"
                        inputName="newsletter"
                        inputId="radio-newsletter"
                        inputLabel="I would like to receive the monthly newsletter"
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className="button-wrapper">
                    <Button
                        className="register-button"
                        type="submit"
                        title="Sign Up"
                        onclick={() => navigate('/login')}
                    />
                </div>

            </form>
            </HeroSection>
            <section>
                <h2>How it works</h2>
            </section>
        </>
    );
}

export default Register;
