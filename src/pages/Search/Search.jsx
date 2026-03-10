import './Search.css'
import React, {useState} from 'react';
import Button from "../../components/button/button.jsx";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import axios from "axios";

function Search() {

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [searchResult, setSearchResult] = useState(null);
    const [inputValue, setInputValue] = useState('');

    async function searchPlants () {
        try {
            toggleLoading(true);
            toggleError(false);

            const result = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/plants/${inputValue.toLowerCase()}`, {
                headers: {
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    "Accept": "application/json",
                },
            });

            console.log(result.data);
            console.log(result.data[0].namePlant);
            console.log(result.data[0].description);

            if (result.data.length === 0) {
                toggleError(true);
                return;
            }


            setSearchResult(result.data[0]);
            // setInputValue('');


        } catch (error) {
            console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }



    return(
        <>
        <div>
            <input type="text"
                   name="search"
                   id="search-field"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && searchPlants()}
            />

            <button type="button" onClick={searchPlants} disabled={loading} >Search</button>

            {error && <p>Plant not found. Please try again.</p>}

        </div>

            <div>
                <h2>{searchResult?.namePlant}</h2>
                <p>{searchResult?.description}</p>
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
                    {searchResult && (
                        <PlantCardSmall
                            plantName={searchResult?.namePlant}
                            plantDescription={searchResult.description}
                            location="Groningen"
                        />
                    )}


                    <PlantCardSmall
                        plantName="Cactus"
                        plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis. Maecenas dignissim tellus et iaculis blandit."
                        location="Groningen"
                    />
                    <PlantCardSmall
                        plantName="Cactus"
                        plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis. Maecenas dignissim tellus et iaculis blandit."
                        location="Groningen"
                    />
                    <PlantCardSmall
                        plantName="Cactus"
                        plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis. Maecenas dignissim tellus et iaculis blandit."
                        location="Groningen"
                    />

                </section>
            </div>
        </>
    );
}

export default Search;
