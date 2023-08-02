import './WelcomePage.css'
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = ({name, picture, followers}) => {
    return (
        <div className='welcome-container'>    
            <div className='welcome-message'>
                {name && <h1> Welcome, {name}</h1>}
                {picture && <img src={picture} alt='Profile' className='profile-picture'/>}
                <p>Followers: {followers}</p>
            </div>

            <div className="navigation-buttons">
                <Link to="/profile-stats" className="nav-button">Profile Stats</Link>
                <Link to="/play-search" className="nav-button">Play/Search</Link>
            </div>
        </div>
    );
};

export default WelcomePage;