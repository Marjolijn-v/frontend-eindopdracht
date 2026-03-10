import './NewPlant.css'
import { useForm } from 'react-hook-form';
import InputComponent from "../../components/inputComponent/inputComponent.jsx";
import Button from "../../components/button/button.jsx";
import React from "react";
import axios from "axios";

function NewPlant(){
    const { handleSubmit, formState:{ errors}, register } = useForm({
        defaultValues:{
            'created-at': new Date().toISOString(),
        }
    });

    async function handleFormSubmit(data) {
        console.log(data);
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                namePlant: data.namePlant,
                description: data.description,
                imageUrl: 0,
                createdAt: data.createdAt,
                memberId: 0
            }, {
                headers: {
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
            'Content-Type': 'application/json',
                }
            });

            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <section className="outer-container new-plant-page">
            <p>Upload Photos</p>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="new-plant-form">
            <div className="input-wrapper">
                <InputComponent
                    className="plant-input plantname-field"
                    inputType="text"
                    inputName="plantname"
                    inputId="plantname-field"
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
                    {...register("description-content")}
                >
                </textarea>
                </label>
            </div>
            <div className="input-wrapper">
                <InputComponent
                    className="plant-input created-at-field"
                    inputType="date"
                    inputName="created-at"
                    inputId="created-at-field"
                    placeholder=""
                    validationRules={{
                        valueAsDate: true,
                    }}
                    register={register}
                    errors={errors}
                />

            </div>
            {/*<div className="input-wrapper">*/}
            {/*    <InputComponent*/}
            {/*        className=""*/}
            {/*        inputType=""*/}
            {/*        inputName=""*/}
            {/*        inputId=""*/}
            {/*        placeholder=""*/}
            {/*        validationRules={}*/}
            {/*        register={register}*/}
            {/*        errors={errors}*/}
            {/*    />*/}

            {/*</div>*/}
            <div className="button-wrapper">
                <Button
                    className="register-button"
                    type="submit"
                    title="Save"
                    // onclick={() => navigate('/login')}
                />
            </div>
        </form>
            </section>
        </>
    );
}

export default NewPlant;