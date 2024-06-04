import React, { useRef, useState } from 'react';
import './game.css';
import cross_icon from '../assets/close.png';
import circle_icon from '../assets/circumference.png';

let data = ["", "", "", "", "", "", "", "", ""];

export const GameCode = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [status, setStatus] = useState(null);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const winConditions = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a] === 'x' ? player1 : player2);
        return;
      }
    }
    if (count === 8) {
      draw();
    }
  };

  const won = (winner) => {
    setLock(true);
    setStatus(`Winner: ${winner}`);
  };

  const draw = () => {
    setLock(true);
    setStatus('Game is Draw');
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    box_array.forEach((e) => {
      e.current.innerHTML = "";
    });
    setCount(0);
    setStatus(null);
    setCurrentPlayer(player1);
    setIsGameStarted(false);
  };

  const handleStartGame = () => {
    if (player1 === player2) {
      alert("Player names cannot be identical.");
      return;
    }
    if (!player1 || !player2) {
      alert("Please enter names for both players.");
      return;
    }
    setCurrentPlayer(player1);
    setIsGameStarted(true);
    setStatus(`${player1}'s Turn`);
  };

  const handleClick = (e, num) => {
    if (lock || data[num] !== "") return;

    if (currentPlayer === player1) {
      e.target.innerHTML = `<img src='${cross_icon}' alt='X' />`;
      data[num] = 'x';
      setCurrentPlayer(player2);
      setStatus(`${player2}'s Turn`);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt='O' />`;
      data[num] = 'o';
      setCurrentPlayer(player1);
      setStatus(`${player1}'s Turn`);
    }
    setCount(count + 1);
    winConditions();
  };

  let box0 = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box_array = [box0, box1, box2, box3, box4, box5, box6, box7, box8];

  return (
    <div className='container'>
      {!isGameStarted ? (
        <div className="player-inputs">
          <input
            type="text"
            placeholder="Enter name for Player 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter name for Player 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button className="button-29" onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <>
          <h1 className="title">Tic Tac Toe</h1>
          <div className={`status ${status ? 'show' : ''}`}>
            {status}
          </div>
          <div className="board">
            <div className="col1">
              <div className="box" ref={box0} onClick={(e) => { handleClick(e, 0) }}></div>
              <div className="box" ref={box3} onClick={(e) => { handleClick(e, 3) }}></div>
              <div className="box" ref={box6} onClick={(e) => { handleClick(e, 6) }}></div>
            </div>
            <div className="col2">
              <div className="box" ref={box1} onClick={(e) => { handleClick(e, 1) }}></div>
              <div className="box" ref={box4} onClick={(e) => { handleClick(e, 4) }}></div>
              <div className="box" ref={box7} onClick={(e) => { handleClick(e, 7) }}></div>
            </div>
            <div className="col3">
              <div className="box" ref={box2} onClick={(e) => { handleClick(e, 2) }}></div>
              <div className="box" ref={box5} onClick={(e) => { handleClick(e, 5) }}></div>
              <div className="box" ref={box8} onClick={(e) => { handleClick(e, 8) }}></div>
            </div>
          </div>
          <button className="button-29" onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default GameCode;
