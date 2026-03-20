import './plantCardSmall.css';
import React, {useEffect, useState} from "react";
import Button from "../button/button.jsx";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import {useNavigate} from "react-router-dom";
import axios from "axios";



function PlantCardSmall( {imageSrc, imageAlt, plantName, plantDescription, location, id, user, onToggleSave, isSaved = false, plantUserId, currentUserId }) {
    const navigate = useNavigate();
    const [isCurrentlySaved, setIsCurrentlySaved] = useState(isSaved);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsCurrentlySaved(isSaved);
    }, [isSaved]);

    const handleSaveClick = async (e) => {
        e.preventDefault();
        await onToggleSave(id);
        setIsCurrentlySaved(!isCurrentlySaved);
    };

    const isOwner = currentUserId && plantUserId && currentUserId === plantUserId;

    const handleDelete = async () => {
        if (!isOwner) {
            setError('You can only delete plants that you created.');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${plantName}?`)) {
            return;
        }

        try {
            setIsDeleting(true);
            setError('');

            const token = localStorage.getItem("token");
            await axios.delete(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'accept': 'application/json',
                        'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                    }
                }
            );

            // Reload the page or update parent state
            window.location.reload();

        } catch (e) {
            console.error('Error deleting plant:', e);
            setError('Failed to delete plant. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };


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

                <span className="location-wrapper">
                    <p>Location:</p>
                    <p>{location}</p>
                </span>
                    <div className="small-card-button-wrapper">
                        {error && <p className="error-text">{error}</p>}
                        {isOwner && (
                        <Button
                            className="button-delete"
                            type="button"
                            title={isDeleting ? "Deleting..." : "Delete"}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        />
                        )}
                        {user && (
                        <button
                            className="like-button"
                            onClick={handleSaveClick}
                            aria-label={isCurrentlySaved ? "Unsave plant" : "Save plant"}
                        >
                            {isCurrentlySaved ? <GoHeartFill /> : <GoHeart />}
                        </button>
                        )}
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
