import './NewPlant.css'
import { useForm } from 'react-hook-form';
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import Button from "../../components/button/button.jsx";
import React, {useContext, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

function NewPlant(){
    const { handleSubmit, formState:{ errors}, register } = useForm();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [newPlantContent, setNewPlantContent] = useState({});
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    async function handleFormSubmit(data) {


        console.log(data);
        try {
            toggleLoading(true);
            setError('');
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                namePlant: data.namePlant,
                description: data.description,
                imageUrl: 0,
                userId: user.id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    'Content-Type': 'application/json',
                }
            });

            console.log(response.data);
            setNewPlantContent(response.data);

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

            {newPlantContent && newPlantContent.id ? (
                <h3>The new plant is successfully added to your account. If you'd like to see the details of the added
                    plant, please click <Link to={`/plants/${newPlantContent.id}`}>here</Link>.
                    If you'd like to go back to you're account, please click <Link to={'/account'}>here</Link>.</h3>
            ) : (

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
                                        message: "Name of the plant is required"
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
                        {/*<div className="input-wrapper">*/}
                        {/*    <InputComponent*/}
                        {/*        className="plant-input createdAd-field"*/}
                        {/*        inputType="date"*/}
                        {/*        inputName="createdAd"*/}
                        {/*        inputId="createdAd-field"*/}
                        {/*        placeholder=""*/}
                        {/*        validationRules={{*/}
                        {/*            valueAsDate: true,*/}
                        {/*        }}*/}
                        {/*        register={register}*/}
                        {/*        errors={errors}*/}
                        {/*    />*/}

                        {/*</div>*/}
                        <div className="button-wrapper">
                            <Button
                                className="register-button"
                                type="submit"
                                title="Save"
                                disabled={loading}
                            />
                        </div>
                        {error && <p>{error}</p>}
                    </form>
                </section>
            )}
        </>
    );
}

export default NewPlant;