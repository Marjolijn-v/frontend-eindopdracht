import './Search.css'
import React from 'react';
import Button from "../../components/button/button.jsx";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";

function Search() {
    return(
        <>
            <div className="outer-container search-result">
                <header className="header search-result">
                    <h2>Search results</h2>
                    <Button
                        title="Filter"
                        type="button"
                    />
                </header>
                <section className="inner-container search-result">
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
