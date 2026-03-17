import './Search.css'
import React, {useState} from 'react';
import Button from "../../components/button/button.jsx";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import axios from "axios";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import InputComponent from "../../components/inputComponent/inputComponent.jsx";


function Search() {

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [inputValue, setInputValue] = useState('');


    async function searchPlants () {
        try {
            toggleLoading(true);
            toggleError(false);

            const result = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants', {
                headers: {
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    "Accept": "application/json",
                },
            });

            const filtered = result.data.filter(plant =>
                plant.namePlant.toLowerCase().includes(inputValue.toLowerCase())
            );

            if (filtered.length === 0) {
                toggleError(true);
                setSearchResults([]);
                return;
            }

            setSearchResults(filtered);

        } catch (e) {
            console.error(e);
            toggleError(true);
            setSearchResults([]);
        } finally {
            toggleLoading(false);

        }
    }



    return(
        <>
            <div className="outer-container search-field">
                <div className="search-field-wrapper">
                    <HiMiniMagnifyingGlass className="search-icon"/>
                    <input type="text"
                           name="search"
                           id="search-field"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && searchPlants()}
                    />
                </div>
                    <button type="button" onClick={searchPlants}
                            disabled={loading}> {loading ? 'Searching... ' : 'Search'}</button>



            </div>

            <div className="outer-container search-result">
                <header className="header search-result">
                    <h2>Search results</h2>
                    <Button
                        title="Filter"
                        type="button"
                        className="button search-result"
                    />
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
                                location="location"

                            />
                        ))
                    ) : (
                        <p>Plant not found. Please try again.</p>
                    )}

                </section>
            </div>
        </>
    );
}

export default Search;
