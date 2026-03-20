import './Register.css'
import React, {useContext, useEffect, useState} from 'react';
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import {useForm} from "react-hook-form";
import {useNavigate, useLocation} from "react-router-dom";
import userIcon from "../../assets/icons/user-icon.png";
import lockIcon from "../../assets/icons/lock-icon.png";
import emailIcon from "../../assets/icons/email-icon.png";
import locationIcon from "../../assets/icons/location-icon.png"
import Button from "../../components/button/button.jsx";
import HeroSection from "../../components/heroSection/heroSection.jsx";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";


function Register() {
    const { handleSubmit, formState:{ errors}, register , reset} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user, member } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const isEditMode = location.state?.isEditMode || false;

    useEffect(() => {
        if (isEditMode && member && member[0]) {
            reset({
                username: member[0]?.name || '',
                email: user?.email || '',
                location: member[0]?.location || '',
                password: '',
                newsletter: member[0]?.newsletter || false
            });
        }
    }, [isEditMode, member, user, reset]);

    async function handleFormSubmit(data) {
        console.log(data);
        try {
            setError('');
            toggleLoading(true);

            if (isEditMode) {
                // Update existing user
                const token = localStorage.getItem("token");

                const updateData = {
                    name: data.username,
                    email: data.email,
                    location: data.location
                };

                // Only include password if it was changed
                if (data.password && data.password.trim() !== '') {
                    updateData.password = data.password;
                }

                const response = await axios.put(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/members/${user.id}`,
                    updateData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );

                console.log('Profile updated successfully:', response.data);
                // Redirect back to account page
                navigate('/account', {state: {message: 'Profile updated successfully!'}});

            } else {

                const userResponse = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                    email: data.email,
                    password: data.password,
                    roles: [
                        'user'
                    ],
                }, {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Content-Type': 'application/json',
                    }
                });

                const userId = userResponse.data.id;

                const memberResponse = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/members', {
                    userId: userId,
                    name: data.username,
                    email: data.email,
                    location: data.location,
                }, {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Content-Type': 'application/json',
                    }
                });

                console.log(userResponse.data, memberResponse.data);

                const loginResponse = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                    email: data.email,
                    password: data.password,
                }, {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Content-Type': 'application/json',
                    }
                });

                login(loginResponse.data);


                navigate('/account');
            }
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || 'Something went wrong during registration. Please try again.');
        } finally {
            toggleLoading(false);
        }
    }

    return(
        <>
            {error && <p className="error-text">{error}</p>}

            <HeroSection>
            <div className="register-header">
                <h1>{isEditMode ? 'Edit Your Profile' : 'Welcome to Leaf Switch!'}</h1>
                <p>{isEditMode ? 'Update your personal information.' : 'Create your new account here and start switching.'}</p>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="register-form">
                <div className="input-wrapper">
                    <img src={userIcon} alt="User icon" className="input-icon"/>
                    <InputComponent
                        className="register-input username-field"
                        inputType="text"
                        inputName="username"
                        inputLabel="Username"
                        inputId="username-field"
                        placeholder="Choose a username"
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
                        inputLabel="Email address"
                        inputId="email-field"
                        placeholder="Email address"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Email address is required',
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
                    <img src={locationIcon} alt="location icon" className="input-icon"/>
                    <InputComponent
                        className="register-input location-field"
                        inputType="text"
                        inputName="location"
                        inputLabel="Location"
                        inputId="location-field"
                        placeholder="What is your location?"
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
                        inputLabel="Password"
                        inputId="password-field"
                        placeholder={isEditMode ? "Leave empty to keep current password" : "Password"}
                        validationRules={isEditMode ? {} : {
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
                        title={isEditMode ? "Save Changes" : "Sign Up"}
                        disabled={loading}
                    />
                    {isEditMode && (
                        <Button
                            className="register-button cancel-button"
                            type="button"
                            title="Cancel"
                            onClick={() => navigate('/account')}
                            disabled={loading}
                        />
                    )}
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
