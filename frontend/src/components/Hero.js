import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>AllCode: Master Tech Skills for Free</h1>
                    <p>
                        Unlock your potential with AllCode's premium free courses.
                        From Full Stack Development to Data Science, we are your companion in your journey to career success.
                    </p>
                    <button className="chat-btn">Start Learning Now</button>
                </div>
                <div className="hero-image">
                    {/* Placeholder for the character illustration */}
                    <div className="character-placeholder">
                        <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="AllCode Character" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
