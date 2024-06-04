import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GameCode } from './Game_Logic/GameCode';
import { Landingpage } from './Game_Logic/LandingPage';
import PlayerVsComputer from './Game_Logic/PlayerVsComputer';
import './App.css'; 
import tictactoe_image from './assets/tictactoe.png'; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/game/" element={<GameCode />} />
          <Route path="/bot/" element={<PlayerVsComputer />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img src={tictactoe_image} alt="Tic Tac Toe" className="tictactoe-image" />
      <div className="header-buttons">
        <button className="button-29" onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to Tic Tac Toe</h1>
      <div className="button-wrapper">
          <button className="button-29" onClick={() => navigate('/bot/')}>Player vs Computer</button>
        </div>
        <div className="button-wrapper">
          <button className="button-29" onClick={() => navigate('/game/')}>Player vs Player</button>
        </div>
    </div>
  );
};

export default App;


