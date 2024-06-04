import React from 'react';
import './landingPage.css';
import { useNavigate } from 'react-router-dom';

export const Landingpage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="tictactoe">
            </div>
            <button className="playbuttons" onClick={() => navigate('/game')}>Player Vs Player</button>
            <br/>
            <button className="playbuttons" onClick={() => navigate('/bot')}>Player Vs Computer</button>
        </div>
    );
};
