import './Home.css'
import React, {useContext, useEffect, useState} from 'react';
import HeroSection from "../../components/heroSection/heroSection.jsx";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import Button from "../../components/button/button.jsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import getRandomPlantsByLocation from "../../helpers/getRandomPlantsByLocation.js";


function Home() {
    const navigate = useNavigate();
    const {authentication, user, member} = useContext(AuthContext);

    const [plants, setPlants] = useState([]);
    const [randomPlants, setRandomPlants] = useState([]);
    const [message, setMessage] = useState('');

    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchPlants() {
            try {
                toggleLoading(true);
                setError('');
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

            } catch (e) {
                console.error(e);
                setError("could not show any plants");
            } finally {
                toggleLoading(false);
            }
        }
        fetchPlants();
    }, [user, member]);

    return (
        <>
            {error && <p className="error-text">{error}</p>}
            <HeroSection>
                <h1>Are you ready to find your plants a new home?</h1>
                <Button
                    type="button"
                    title="Start switching leaves"
                    onClick={authentication ? (() => navigate('/account')) : (() => navigate('/login')) }
                />
                <Button
                    type="button"
                    title="How does it work?"
                    onClick={() => navigate('/register')}
                />
            </HeroSection>

            <section className="recommended-container">
                <h2 className="recommended-title">You might also like</h2>
                <div className="recommended-plant-cards">
                    {message && <p className="info-message">{message}</p>}
                    {randomPlants.length === 0 ? (
                        <p>No plants available</p>
                    ) : (
                        randomPlants.map(plant => (
                            <PlantCardSmall
                                key={plant.id}
                                id={plant.id}
                                plantName={plant.namePlant}
                                plantDescription={plant.description}
                                location={plant.location}

                            />
                        ))
                    )}
                </div>
            </section>
        </>
    );
}

export default Home;
