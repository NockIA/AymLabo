import "./header_game.css";
import "../../style/global.css";
import { useEffect, useState } from "react";

interface HeaderGameProps {
  score: number;
  time: number;
  precision: number;
}

export const HeaderGame: React.FC<HeaderGameProps> = ({ score, time,precision }) => {
  const [renderedTime, setRenderedTime] = useState("00:00");
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    setRenderedTime(formatTime(time));
  }, [time]);

  return (
    <header className="flex-row container-header-game">
      <div className="flex-row container-score">
        <span style={{ width: score + "px" }} className="score-bar"></span>
        <h2>{score}</h2>
      </div>
      <div className="flex-col">
        <h2 className="timer">{renderedTime}</h2>
        <h2 className="precision">{!Number.isNaN(precision) ? precision + '%' : '0%' }</h2>
      </div>
    </header>
  );
};
