import './heroSection.css'
import React from "react";
import Button from "../button/button.jsx";
import {useNavigate} from "react-router-dom";

function HeroSection() {
    const navigate = useNavigate();

    return (
    <>
        <section className='outer-container hero-section'>
            <div className='inner-container hero-section'>
                <article className='start-card'>
                    <h1>Are you ready to find your plants a new home?</h1>
                    <Button
                        type="button"
                        title="Start switching leaves"
                        onclick={() => navigate('/login')}
                    />
                    <Button
                        type="button"
                        title="How does it work?"
                        onclick={() => navigate('/register')}
                    />
                </article>
            </div>
        </section>
    </>
    )
}

export default HeroSection;