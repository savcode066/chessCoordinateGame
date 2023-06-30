import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import "./ChessCoordinateGame.css";

function ChessCoordinateGame() {
  const [nextCoordinate, setNextCoordinate] = useState("");
  const [timer, setTimer] = useState(60000);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNextCoordinate();
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 10 : 0));
    }, 10);

    return () => clearInterval(interval);
  }, []);

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
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let randomColumn = letters[Math.floor(Math.random() * letters.length)];
    let randomRow = Math.floor(Math.random() * 8) + 1;
    let coordinate = randomColumn + randomRow;
    setNextCoordinate(coordinate);
  };

  const handleSquareClick = (square: string) => {
    if (timer > 0 && square === nextCoordinate) {
      generateNextCoordinate();
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <div className="container">
      <div className="chessboard-container">
        <Chessboard
          width={window.innerWidth * 0.45}
          position="start"
          draggable={false}
          onSquareClick={handleSquareClick}
        />
        <div className="coordinate">{nextCoordinate}</div>
      </div>
      <div className="info-container">
        <div className="info-background">
          <div className="info-box">
            <div className="info-value">
              <div className="smartIdea"> timer</div>
              <i className="fas fa-clock fa-5x"></i>{" "}
              <span className="timer">{formatTime(timer)}</span>
            </div>
          </div>
          <div className="info-box">
            <div className="info-value">
              <div className="smartIdea"> score</div>
              <i className="fas fa-trophy fa-5x"></i>{" "}
              <span className="score">{score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChessCoordinateGame;
