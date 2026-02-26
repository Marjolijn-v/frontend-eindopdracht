import React from 'react';
import Button from "../../components/button/button.jsx";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";

function Search() {
    return(
        <>
        <header>
        <h2>Search results</h2>
            <Button
                title="Filter"
                type="button"
            />
        </header>
            <section>
                <PlantCardSmall
                    plantName="Cactus"
                    plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis. Maecenas dignissim tellus et iaculis blandit. Nam dignissim consectetur felis, eu hendrerit magna dapibus ut. Morbi quis molestie augue."
                    location="Groningen"
                />
            </section>
        </>
    );
}

export default Search;
