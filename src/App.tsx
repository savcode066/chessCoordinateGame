import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import "./ChessCoordinateGame.css";

function ChessCoordinateGame() {
  const [nextCoordinate, setNextCoordinate] = useState("");
  const [timer, setTimer] = useState(60000);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    generateNextCoordinate();
    const interval = setInterval(() => {
      if (gameStarted) {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 10 : 0));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (timer === 0) {
      setNextCoordinate("");
    }
  }, [timer]);

  const formatTime = (time: number): string => {
    const seconds: number = Math.floor(time / 1000);
    if (timer < 10) {
      return `00:0${seconds}`;
    }
    return `00:${seconds}`;
  };

  const generateNextCoordinate = () => {
    if (gameStarted) {
      const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
      let randomColumn = letters[Math.floor(Math.random() * letters.length)];
      let randomRow = Math.floor(Math.random() * 8) + 1;
      let coordinate = randomColumn + randomRow;
      setNextCoordinate(coordinate);
    }
  };

  const handleSquareClick = (square: string) => {
    if (gameStarted && timer > 0 && square === nextCoordinate) {
      generateNextCoordinate();
      setScore(score + 1);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimer(60000);
    setGameStarted(true);
  };

  return (
    <div className="container">
      <div className="chessboard-container">
        <div className="coordinate" style={{fontSize: window.innerWidth * 0.2}}>{nextCoordinate}</div>
        <Chessboard
          width={window.innerWidth * 0.4}
          position="start"
          draggable={false}
          onSquareClick={handleSquareClick}
        />
      </div>
      <div className="info-container">
        <h1 className='title-text'>Coordinate Trainer</h1>
        <div className="data-container">        
          <div className="info-box">
            <div className="info-value">
              <div className="fas fa-clock fa-5x"></div>
              <span className="timer">{formatTime(timer)}</span>
            </div>
          </div>
          <div className="info-box">
            <div className="info-value">
              <i className="fas fa-trophy fa-5x"></i>
              <span className="score">{score}</span>
            </div>
          </div>
        </div>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
      
    </div>
  );
}

export default ChessCoordinateGame;
