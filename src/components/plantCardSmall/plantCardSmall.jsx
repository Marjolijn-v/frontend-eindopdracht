import './plantCardSmall.css';
import React from "react";
import Button from "../button/button.jsx";
import {useNavigate} from "react-router-dom";



function PlantCardSmall( {imageSrc, imageAlt, plantName, plantDescription, location, id }) {
    const navigate = useNavigate();

    return(
        <section className="small-card-outer-container">
            <article className="small-card-container">
                <div className="small-card-visual">
                    <div className="circle small"></div>
                    <div className="circle large"></div>
                    <div className="image-wrapper">
                        <img src={imageSrc} alt={imageAlt} className= "plant-image-small"/>
                    </div>

                </div>
                <div className="small-card-inner-container">
                    <h2 className="small-card-title">{plantName}</h2>
                    <p className="small-card-description">{plantDescription}</p>
                    <div className="small-card-location-button">
                <span className="location-wrapper">
                    <p>Location:</p>
                    <p>{location}</p>
                </span>
                        <Button
                            className="button-on-card"
                            type="button"
                            title="Switch!"
                            onClick={() => navigate(`/plant/${id}`)}
                        />
                    </div>
                </div>

            </article>
        </section>
    );
}

export default PlantCardSmall;
