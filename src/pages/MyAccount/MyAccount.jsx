import './MyAccount.css'
import React, {useContext, useEffect, useState} from 'react';
import Button from "../../components/button/button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import axios from "axios";


function MyAccount() {

    const { user, member } = useContext(AuthContext);
    const navigate = useNavigate();

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        async function fetchPlants() {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/plants`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                        "Accept": "application/json",
                    }
                });

                setPlants(response.data);

            } catch (e) {
                console.error(e);
            }

            }

            if (user && user.id) {
                fetchPlants();
        }
    }, [user]);




    return (
        <>
            <div className="outer-container account-page">
                <header>
                    <h1 className="title account-page">My Account</h1>
                </header>
                <section className="content account-page">
                    <div className="two-article-wrapper account-page">
                        <article className="details account-page">
                            <h3>My details</h3>
                            <div>
                                <p><strong>Name:</strong> {member?.name}</p>
                                <p><strong>Location:</strong> {member?.location}</p>
                                <p><strong>Email address:</strong> { user?.email}</p>
                            </div>
                            <Button
                                title="Change"
                                type="button"
                            />
                        </article>
                        <article className="messages account-page">
                            <h3>My messages</h3>
                        </article>
                    </div>
                    <div className="two-article-wrapper account-page">
                        <article className="my-plants account-page">
                            <h3>My plants</h3>
                            <div>
                                {plants.length > 0 ? (
                                    plants.map(plant => (
                                        <PlantCardSmall
                                            key={plant.id}
                                            id={plant.id}
                                            plantName={plant.namePlant}
                                            plantDescription={plant.description}
                                            location="location"

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
                            />
                        </article>
                        <article className="saved-plants account-page">
                            <h3>My saved plants</h3>
                            <div>
                                <div>
                                    <h4>plant</h4>
                                </div>
                                <div>
                                    <h4>plant</h4>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MyAccount;
