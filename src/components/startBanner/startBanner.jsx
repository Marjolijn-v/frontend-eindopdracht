import './startBanner.css'
import React from "react";

function StartBanner() {
    return (
    <>
        <section className='outer-container start-banner'>
            <div className='inner-container start-banner'>
                <article className='start-card'>
                    <h1>Are you ready to find your plants a new home?</h1>
                    <button>Start switching leaves</button>
                    <button>How does it work?</button>
                </article>
            </div>
        </section>
    </>
    )
}

export default StartBanner;