import Button from "../button/button.jsx";
import React from "react";

<div className="outer-container plant-details">
    <header>
        <h2>Name of plant</h2>
    </header>
    <section className="plant-details-container">
        <div className="images plant-details">
            <img className="image-large plant-details" src="" alt="plant"/>
            <img className="image-medium plant-details" src="" alt="plant"/>
            <img className="image-medium plant-details" src="" alt="plant"/>
        </div>
        <div className="info plant-details">
            <h4>Info</h4>
            <p>Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis.</p>
            <h4>Location</h4>
            <p>Groningen</p>
            <Button
                title="Send message"
                type="button"
                className="send-message-button"
            />
        </div>
    </section>