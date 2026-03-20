import './MyAccount.css'
import React, {useContext, useEffect, useState} from 'react';
import Button from "../../components/button/button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import axios from "axios";
import {SavedPlantsContext} from "../../context/SavedPlantsContext.jsx";
import MyMessages from "../../components/myMessages/myMessages.jsx";
import button from "../../components/button/button.jsx";



function MyAccount() {

    const { user, member } = useContext(AuthContext);
    const {savedPlants, fetchSavedPlants, toggleSavePlant, isSaved} = useContext(SavedPlantsContext);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [plants, setPlants] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);



    useEffect(() => {
        async function fetchPlants() {
            const token = localStorage.getItem("token");

            try {
                toggleLoading(true);
                setError('');

                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${user.id}/plants`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Accept': 'application/json',
                    }
                });

                setPlants(response.data);
                await fetchSavedPlants(user.id);


            } catch (e) {
                console.error(e.response?.data);
                setError('Something went wrong, please try again.')
            } finally {
                toggleLoading(false);
            }

            }

            if (user && user.id) {
                fetchPlants();
        }
    }, [user, fetchSavedPlants]);


    useEffect(() => {
        async function fetchMessages() {
            const token = localStorage.getItem("token");

            try {
                setMessagesLoading(true);

                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${user.id}/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                        'Accept': 'application/json',
                    }
                });

                setMessages(response.data);

            } catch (e) {
                console.error('Error fetching messages:', e.response?.data);
            } finally {
                setMessagesLoading(false);
            }
        }

        if (user && user.id) {
            fetchMessages();
        }
    }, [user]);


    const handleToggleSave = (plantId) => {
        toggleSavePlant(plantId, user.id, plants);
    };




    return (
        <>
            {error && <p className="error-text">{error}</p>}
            <div className="outer-container account-page">
                <header>
                    <h1 className="title account-page">My Account</h1>
                </header>
                <section className="content account-page">
                    <div className="two-article-wrapper account-page">
                        <article className="details account-page">
                            <h3>My details</h3>
                            <div>
                                <p><strong>Name:</strong> {member[0]?.name}</p>
                                <p><strong>Location:</strong> {member[0]?.location}</p>
                                <p><strong>Email address:</strong> { user?.email}</p>
                            </div>
                            <Button
                                title="Change"
                                type="button"
                                onClick={() => navigate('/register', { state: { isEditMode: true }})}
                            />
                        </article>
                        <article className="messages account-page">
                            <h3>My messages</h3>
                            <div>
                                {messagesLoading ? (
                                    <p>Loading messages...</p>
                                ) : messages.length > 0 ? (
                                    messages.map(msg => (
                                        <MyMessages key={msg.id} message={msg} />
                                    ))
                                ) : (
                                    <p>You haven't received any messages yet.</p>
                                )}
                            </div>

                        </article>
                    </div>
                    <div className="two-article-wrapper account-page">
                        <article className="my-plants account-page">
                            <h3>My plants</h3>
                            <div>
                                {plants.length > 0 ? (
                                    plants.map(plant => (
                                        <PlantCardSmall
                                            imageSrc={`data:${plant?.image?.contentType};base64,${plant?.image?.base64}`}
                                            imageAlt={plant.namePlant}
                                            key={plant.id}
                                            id={plant.id}
                                            plantName={plant.namePlant}
                                            plantDescription={plant.description}
                                            location={plant?.location}
                                            user={user}
                                            onToggleSave={handleToggleSave}
                                            isSaved={isSaved(plant.id)}

                                        />
                                    ))
                                ) : (
                                    <p>You've not added any plants yet.</p>
                                )}
                            </div>
                            <Button
                                title="Add new plant"
                                type="button"
                                onClick={() => navigate('/newplant') }
                                disabled={loading}
                            />
                        </article>
                        <article className="saved-plants account-page">
                            <h3>My saved plants</h3>
                            <div>
                                {savedPlants.length > 0 ? (
                                    savedPlants.map(plant => (
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
                                            isSaved={true}
                                        />
                                    ))
                                ) : (
                                    <p>You've not saved any plants yet.</p>
                                )}
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MyAccount;
