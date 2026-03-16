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
        console.log(data);

        try {
            toggleLoading(true);
            setError('');
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                namePlant: data.namePlant,
                description: data.description,
                imageUrl: null,
                userId: user.id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    'Content-Type': 'application/json',
                }
            });

            console.log(response.data);
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
                    <p>Upload Photos</p>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="new-plant-form">
                        <div className="input-wrapper">
                            <InputComponent
                                className="plant-input namePlant-field"
                                inputType="text"
                                inputName="namePlant"
                                inputId="namePlant-field"
                                placeholder="Name of the plant"
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
                                <textarea
                                    id="description-field"
                                    className="plant-input description-field"
                                    rows="4"
                                    cols="40"
                                    placeholder="Descripe the plant"
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