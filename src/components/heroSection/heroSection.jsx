import './heroSection.css'
import React from "react";
import plantsWindow from '../../assets/Plants window.png'
import womanWithPlants from '../../assets/Woman with plants.png'


function HeroSection({children}) {


    return (
    <>
        <section className='outer-container hero-section'>
            <span className='image-wrapper'>
                <img src={womanWithPlants} alt="Woman with plants" className='hero-image-woman'/>
            </span>
            <div className='inner-container hero-section'>
                <article className='start-card'>
                    {children}
                </article>
            </div>
            <span className='image-wrapper'>
                <img src={plantsWindow} alt="Plants by window" className='hero-image-window'/>
            </span>
        </section>
    </>
    )
}

export default HeroSection;