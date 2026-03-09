import './Home.css'
import React, {useContext} from 'react';
import HeroSection from "../../components/heroSection/heroSection.jsx";
import PlantCardSmall from "../../components/plantCardSmall/plantCardSmall.jsx";
import Button from "../../components/button/button.jsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";


function Home() {
    const navigate = useNavigate();
    const {authentication} = useContext(AuthContext);

    return (
        <>
            <HeroSection>
                <h1>Are you ready to find your plants a new home?</h1>
                <Button
                    type="button"
                    title="Start switching leaves"
                    onclick={authentication ? (() => navigate('/account')) : (() => navigate('/login')) }
                />
                <Button
                    type="button"
                    title="How does it work?"
                    onclick={() => navigate('/register')}
                />
            </HeroSection>

            <section className="recommended-container">
                <h2 className="recommended-title">Recommended for you</h2>
                <div className="recommended-plant-cards">
                    <PlantCardSmall
                        plantName="Cactus"
                        plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis."
                        location="Groningen"
                    />
                    <PlantCardSmall
                        plantName="Cactus"
                        plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis."
                        location="Groningen"
                    />
                    <PlantCardSmall
                        plantName="Cactus"
                        plantDescription="Lorem ipsum Aenean scelerisque nisi id nisl maximus molestie. Duis ornare purus ut dapibus rutrum. Curabitur magna leo, placerat id sodales nec, auctor non sapien. Nunc sodales massa nibh, vitae iaculis neque imperdiet id. Donec rhoncus pulvinar lobortis."
                        location="Groningen"
                    />
                </div>

            </section>


        </>
    );
}

export default Home;
