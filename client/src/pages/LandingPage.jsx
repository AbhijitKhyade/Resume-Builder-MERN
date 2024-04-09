import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();


    const handleGetStarted = () => {
        navigate('/create-resume');
    };

    return (
        <div className="landing-page">
            <div className="big-text">Welcome to Resume Builder</div>
            <button className="get-started-button" onClick={handleGetStarted}>
                Get Started
            </button>
        </div>
    );
}
