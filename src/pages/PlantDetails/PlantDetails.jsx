import React from 'react';
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import Button from "../../components/button/button.jsx";

function PlantDetails() {
    return (
        <>
            <header><h2>Plant Details</h2></header>
            <section>
                <div><p>Images of plant</p></div>
                <div>
                    <h4>Info</h4>
                    <p>Info about the plant</p>
                    <h4>Location</h4>
                    <p>Groningen</p>
                    <Button
                    title="Send message"
                    type="button"
                    />
                </div>
            </section>
            <section>
                <h2>Recommended for you</h2>
                <PlantCardSmall
                    plantName="Cactus"
                    plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis. Maecenas dignissim tellus et iaculis blandit. Nam dignissim consectetur felis, eu hendrerit magna dapibus ut. Morbi quis molestie augue."
                    location="Groningen"
                />
            </section>

        </>
    );
}

export default PlantDetails;
