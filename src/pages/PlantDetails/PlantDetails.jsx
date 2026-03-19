import './PlantDetails.css'
import React, {useContext, useEffect, useState} from 'react';
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import Button from "../../components/button/button.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import getRandomPlantsByLocation from "../../helpers/getRandomPlantsByLocation.js";
import { GoHeart, GoHeartFill } from "react-icons/go";
import {AuthContext} from "../../context/AuthContext.jsx";
import {SavedPlantsContext} from "../../context/SavedPlantsContext.jsx";

function PlantDetails() {
    const { id } = useParams();
    const { user, member } = useContext(AuthContext);
    const { toggleSavePlant, isSaved } = useContext(SavedPlantsContext);

    const [plant, setPlant] = useState();

    const [plants, setPlants] = useState([]);
    const [randomPlants, setRandomPlants] = useState([]);
    const [message, setMessage] = useState('');
    const [savingPlant, setSavingPlant] = useState(false);
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

                const plantResponse = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    }
                });

                const memberResponse = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/members', {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    }
                });

                const locationMap = {};
                memberResponse.data.forEach(member => {
                    locationMap[member.userId] = member.location;
                });

                const plantsWithLocation = plantResponse.data.map(plant => ({
                    ...plant,
                    location: locationMap[plant.userId]
                }));

                setPlants(plantsWithLocation);

                const userLocation = user ? member?.[0]?.location : null;
                const {plants: randomPlants, message: resultMessage} = getRandomPlantsByLocation(plantsWithLocation, userLocation, 5);

                setRandomPlants(randomPlants);
                setMessage(resultMessage);

                console.log('Plant data:', plant);
                console.log('Image URL:', plant?.image);

            } catch (e) {
                console.error(e);
            } finally {
                toggleLoading(false);
            }
        }
        fetchPlant();
    }, [id, user, member]);

    const handleToggleSave = (plantId) => {
        toggleSavePlant(plantId, user.id, plants);
    };

    const handleSavePlant = async () => {
        try {
            setSavingPlant(true);
            await handleToggleSave(plant.id);
        } catch (e) {
            console.error(e);
        } finally {
            setSavingPlant(false);
        }
    };

    return (
        <>
            <div className="outer-container plant-details">
                <header>
                    <h2>{plant?.namePlant}</h2>
                </header>
                <section className="plant-details-container">
                    <div className="images plant-details">
                        <img
                            className="image-large plant-details"
                            src={`data:${plant?.image?.contentType};base64,${plant?.image?.base64}`}
                            alt={plant?.namePlant}
                        />
                    </div>
                    <div className="info plant-details">
                        <h4>Info</h4>
                        <p>{plant?.description}</p>
                        <h4>Location</h4>
                        <p>{plant?.location}</p>
                        <div className="button-wrapper">
                            {user && (
                                <button
                                    className="like-button"
                                    onClick={handleSavePlant}
                                    disabled={loading}
                                    aria-label={isSaved(plant?.id) ? "Unsave plant" : "Save plant"}
                                >
                                    {isSaved(plant?.id) ? <GoHeartFill/> : <GoHeart/>}
                                </button>
                            )}
                            <Button
                                title="Send message"
                                type="button"
                                className="send-message-button"
                                disabled={loading}
                            />
                        </div>
                    </div>
                </section>
                <section className="recommended-container plant-details">
                    <h2 className="recommended-title plant-details">You might also like</h2>
                    <div className="recommended-plant-cards plant-details">
                        {message && <p className="info-message">{message}</p>}
                        {randomPlants.length === 0 ? (
                            <p>No plants available</p>
                        ) : (
                            randomPlants.map(plant => (
                                <PlantCardSmall
                                    imageSrc={`data:${plant?.image?.contentType};base64,${plant?.image?.base64}`}
                                    imageAlt={plant.namePlant}
                                    key={plant.id}
                                    id={plant.id}
                                    plantName={plant.namePlant}
                                    plantDescription={plant.description}
                                    location={plant.location}
                                    user={user}
                                    onToggleSave={handleToggleSave}
                                    isSaved={isSaved(plant.id)}

                                />
                            ))
                        )}
                    </div>

                </section>
        </div>
        </>
    );
}

export default PlantDetails;
