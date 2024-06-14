import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ErrorPage.css';
import errorImg from '../assets/error-image.jpg';

const ErrorPage = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <img src={errorImg} alt="Error" className="error-image" />
                <h2 className="error-heading">Page Not Found!</h2>
                <p className="error-message">The page you are looking for could not exists.</p>
                <Link to={'/'} className='return-button'>Return To Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;
