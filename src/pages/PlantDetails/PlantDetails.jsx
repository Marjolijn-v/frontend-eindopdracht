import './PlantDetails.css'
import React, {useEffect, useState} from 'react';
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import Button from "../../components/button/button.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";

function PlantDetails() {
    const { id } = useParams();
    const [plant, setPlant] = useState();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function fetchPlant() {
            try {
                toggleLoading(true);
                toggleError(false);

                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants/${id}`, {
                    headers: {
                        'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                        "Accept": "application/json",
                    },
                });
                setPlant(response.data);

            } catch (e) {
                console.error(e);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPlant();
    }, [id]);

    return (
        <>
            <div className="outer-container plant-details">
                <header>
                    <h2>{plant?.namePlant}</h2>
                </header>
                <section className="plant-details-container">
                    <div className="images plant-details">
                        <img className="image-large plant-details" src={plant?.imageUrl} alt="plant"/>
                        <img className="image-medium plant-details" src={plant?.image} alt="plant"/>
                        <img className="image-medium plant-details" src={plant?.image} alt="plant"/>
                    </div>
                    <div className="info plant-details">
                        <h4>Info</h4>
                        <p>{plant?.description}</p>
                        <h4>Location</h4>
                        <p>{plant?.location}</p>
                        <Button
                            title="Send message"
                            type="button"
                            className="send-message-button"
                            disabled={loading}
                        />
                    </div>
                </section>
                <section className="recommended-container plant-details">
                    <h2 className="recommended-title plant-details">Recommended for you</h2>
                    <div className="recommended-plant-cards plant-details">
                        <PlantCardSmall
                            plantName="Cactus"
                            plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis."
                            location="Groningen"
                        />
                        <PlantCardSmall
                            plantName="Cactus"
                            plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis."
                            location="Groningen"
                        />
                        <PlantCardSmall
                            plantName="Cactus"
                            plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis."
                            location="Groningen"
                        />
                    </div>

                </section>
        </div>
        </>
    );
}

export default PlantDetails;
