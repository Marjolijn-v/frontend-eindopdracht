import './Search.css'
import React, {useContext, useState} from 'react';

import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import axios from "axios";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import {AuthContext} from "../../context/AuthContext.jsx";
import {SavedPlantsContext} from "../../context/SavedPlantsContext.jsx";



function Search() {

    const { user } = useContext(AuthContext);
    const { fetchSavedPlants, toggleSavePlant, isSaved } = useContext(SavedPlantsContext);

    const [error, setError] = useState('');
    const [loading, toggleLoading] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [inputValue, setInputValue] = useState('');



    async function searchPlants () {
        try {
            toggleLoading(true);
            setError('');

            const result = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                headers: {
                    'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                    "Accept": "application/json",
                },
            });

            const memberResponse = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/members', {
                headers: {
                    'accept': 'application/json',
                    'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                }
            });

            const locationMap = {};
            memberResponse.data.forEach(member => {
                locationMap[member.userId] = member.location;
            });

            const plantsWithLocation = result.data.map(plant => ({
                ...plant,
                location: locationMap[plant.userId]
            }));



            const filtered = plantsWithLocation.filter(plant => {
                const search = inputValue.toLowerCase();

                return (
                    plant.namePlant.toLowerCase().includes(search) || plant?.location?.toLowerCase().includes(search)
                );
            });

            if (filtered.length === 0) {
                setError("No plants found");
                setSearchResults([]);
                return;
            }

            setSearchResults(filtered);

            if (user && user.id) {
               await fetchSavedPlants(user.id);
            }

        } catch (e) {
            console.error(e);
            setError("No plants found");
            setSearchResults([]);
        } finally {
            toggleLoading(false);

        }
    }

    const handleToggleSave = (plantId) => {
        toggleSavePlant(plantId, user.id, searchResults);
    };


    return(
        <>
            <div className="outer-container search-field">
                <div className="search-field-wrapper">
                    <HiMiniMagnifyingGlass className="search-icon"/>
                    <input type="text"
                           name="search"
                           id="search-field"
                           placeholder="Enter plant name or location"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && searchPlants()}
                    />
                </div>
                    <button type="button" onClick={searchPlants}
                            disabled={loading}> {loading ? 'Searching... ' : 'Search'}</button>



            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="outer-container search-result">
                <header className="header search-result">
                    <h2>Search results</h2>
                    {/*<Button*/}
                    {/*    title="Filter"*/}
                    {/*    type="button"*/}
                    {/*    className="button search-result"*/}
                    {/*/>*/}
                </header>
                <section className="inner-container search-result">
                    {searchResults.length > 0 ? (
                        searchResults.map(plant => (
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
                    ) : (
                        <p>Find a plant that needs switching! You can either search on the name of the plant you're looking for or the location.</p>
                    )}

                </section>
            </div>
        </>
    );
}

export default Search;
