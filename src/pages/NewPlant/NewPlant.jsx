import './NewPlant.css'
import { useForm } from 'react-hook-form';
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import Button from "../../components/button/button.jsx";
import React, {useContext, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

function NewPlant(){
    const { handleSubmit, formState:{ errors}, register } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');


    async function handleFormSubmit(data) {

        const token = localStorage.getItem("token");

        try {
            toggleLoading(true);
            setError('');
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                namePlant: data.namePlant,
                description: data.description,
                userId: user.id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

            const plantId = response.data.id;

            if (data.imageUrl && data.imageUrl.length > 0) {
                const formData = new FormData();
                formData.append("image", data.imageUrl[0]);

                await axios.patch(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants/${plantId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            }

            console.log(response.data, data);
            navigate(`/plant/${response.data.id}`);

        } catch (e) {
            console.error(e);
            setError("something went wrong, please try again");
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            <header>
                <h2>Add new plant</h2>
            </header>

                <section className="outer-container new-plant-page">

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="new-plant-form">
                        <div className="input-wrapper">

                            <InputComponent
                                className="plant-input image-input"
                                inputType="file"
                                accept="image/*"
                                inputName="imageUrl"
                                inputId="imageUrl"
                                inputLabel="Upload a photo of the plant:"
                                validationRules={{
                                    required: {
                                        value: false,
                                    }
                                }}
                                register={register}
                                errors={errors}


                            />
                            <InputComponent
                                className="plant-input namePlant-field"
                                inputType="text"
                                inputName="namePlant"
                                inputId="namePlant-field"
                                inputLabel="Name of the plant:"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "Plant name is required"
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />

                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="description-field">
                                <p>Plant description:</p>
                                <textarea
                                    id="description-field"
                                    className="plant-input description-field"
                                    rows="4"
                                    cols="40"
                                    placeholder="Describe the plant"
                                    {...register("description")}
                                >
                                </textarea>
                            </label>
                        </div>
                        <div className="button-wrapper">
                            <Button
                                className="register-button"
                                type="submit"
                                title="Save"
                                disabled={loading}
                            />
                        </div>
                        {error && <p className="error-text">{error}</p>}
                    </form>
                </section>
        </>
    );
}

export default NewPlant;