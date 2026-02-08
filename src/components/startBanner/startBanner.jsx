import './startBanner.css'
import React from "react";
import Button from "../button/button.jsx";
import {useNavigate} from "react-router-dom";

function StartBanner() {
    const navigate = useNavigate();

    return (
    <>
        <header className='outer-container start-banner'>
            <div className='inner-container start-banner'>
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
                    />
                </article>
            </div>
        </header>
    </>
    )
}

export default StartBanner;