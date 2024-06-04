import React, { useState, useEffect } from 'react';
import './PlayerVsComputer.css';
import cross_icon from '../assets/close.png';
import circle_icon from '../assets/circumference.png';

const aiPlayer = 'x';
const humanPlayer = 'o';

const PlayerVsComputer = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [lock, setLock] = useState(false);
  const [status, setStatus] = useState("Your Turn");
  const [currentPlayer, setCurrentPlayer] = useState(humanPlayer);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    setStatus(currentPlayer === humanPlayer ? "Your Turn" : "AI's Turn");
  }, [currentPlayer]);

  const winConditions = (currentBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    if (!currentBoard.includes("")) {
      return 'draw';
    }
    return null;
  };

  const minimax = (newBoard, player) => {
    const availSpots = newBoard.filter(s => s === "");

    const winner = winConditions(newBoard);
    if (winner === humanPlayer) {
      return { score: -10 };
    } else if (winner === aiPlayer) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = newBoard.indexOf(availSpots[i]);
      newBoard[move.index] = player;

      if (player === aiPlayer) {
        const result = minimax(newBoard, humanPlayer);
        move.score = result.score;
      } else {
        const result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      newBoard[move.index] = "";
      moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  const aiMove = (currentBoard) => {
    const bestSpot = minimax(currentBoard, aiPlayer).index;
    currentBoard[bestSpot] = aiPlayer;

    setBoard([...currentBoard]);
    const result = winConditions(currentBoard);
    if (result) {
      if (result === 'draw') {
        setStatus('Game is Draw');
      } else {
        setStatus(`Winner: ${result.toUpperCase()}`);
      }
      setLock(true);
    } else {
      setCurrentPlayer(humanPlayer);
    }
  };

  const handleClick = (index) => {
    if (lock || board[index] !== "") {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = humanPlayer;
    setBoard(newBoard);

    const result = winConditions(newBoard);
    if (result) {
      if (result === 'draw') {
        setStatus('Game is Draw');
      } else {
        setStatus(`Winner: ${result.toUpperCase()}`);
      }
      setLock(true);
    } else {
      setCurrentPlayer(aiPlayer);
      setTimeout(() => aiMove(newBoard), 500);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setLock(false);
    setStatus("Your Turn");
    setCurrentPlayer(humanPlayer);
    setIsGameStarted(false);
  };

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className='container'>
        <>
          <h1 className="title">Tic Tac Toe</h1>
          <div className={`status ${status ? 'show' : ''}`}>
            {status}
          </div>
          <div className="board">
            {board.map((box, index) => (
              <div key={index} className="box" onClick={() => handleClick(index)}>
                {box === 'x' && <img src={cross_icon} alt='X' />}
                {box === 'o' && <img src={circle_icon} alt='O' />}
              </div>
            ))}
          </div>
          <button className="button-29" onClick={reset}>Reset</button>
        </>

    </div>
  );
};

export default PlayerVsComputer;
