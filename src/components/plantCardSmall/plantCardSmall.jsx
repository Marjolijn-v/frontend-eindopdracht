import './plantCardSmall.css';
import React from "react";
import Button from "../button/button.jsx";
import cactus from "../../assets/cactus.jpg"
import {useNavigate} from "react-router-dom";



function PlantCardSmall( {plantName, plantDescription, location }) {
    const navigate = useNavigate();

    return(
        <article className="small-card-container">
            <div className="small-card-visual">
                <div className="circle large"></div>
                <div className="circle small"></div>
                <img src={cactus} alt="cactus" className="plant-image-small"/>
            </div>
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
                    onClick={() => navigate('/plant')}
                />
            </div>

        </article>
    );
}

export default PlantCardSmall;
