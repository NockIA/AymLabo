import React, { useState, useEffect, useRef } from "react";
import "./solo.css";
import '../../style/global.css';
import Crosshair from "@/components/crosshair/crosshair";

interface Target {
  id: number;
  top: number;
  left: number;
}

const Solo: React.FC = () => {
  const [score, setScore] = useState(1300);
  const [targets, setTargets] = useState<Target[]>([]);
  const gridSize = 100;
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (score > window.innerWidth -150) {
        setScore(0); 
    }
  },[score])

  const addTarget = () => {
    if (targets.length < 8) {
      let newTarget: Target;
      do {
        const gridX = Math.floor(
          Math.random() * (gameRef.current!.offsetWidth / gridSize)
        );
        const gridY = Math.floor(
          Math.random() * (gameRef.current!.offsetHeight / gridSize)
        );
        newTarget = {
          id: Math.floor(Math.random() * 1000),
          top: Math.max(
            0,
            Math.min(gridY * gridSize, gameRef.current!.offsetHeight - gridSize)
          ),
          left: Math.max(
            0,
            Math.min(gridX * gridSize, gameRef.current!.offsetWidth - gridSize)
          ),
        };
      } while (
        targets.some(
          (target) =>
            target.top === newTarget.top && target.left === newTarget.left
        )
      );
      setTargets([...targets, newTarget]);
    }
  };

  useEffect(() => {
    const defaultTargets: Target[] = [];
    for (let i = 0; i < 3; i++) {
      let newTarget: Target;
      do {
        const gridX = Math.floor(
          Math.random() * (gameRef.current!.offsetWidth / gridSize)
        );
        const gridY = Math.floor(
          Math.random() * (gameRef.current!.offsetHeight / gridSize)
        );
        newTarget = {
          id: i,
          top: Math.max(
            0,
            Math.min(gridY * gridSize, gameRef.current!.offsetHeight - gridSize)
          ),
          left: Math.max(
            0,
            Math.min(gridX * gridSize, gameRef.current!.offsetWidth - gridSize)
          ),
        };
      } while (
        targets.some(
          (target) =>
            target.top === newTarget.top && target.left === newTarget.left
        )
      );
      defaultTargets.push(newTarget);
    }
    setTargets(defaultTargets);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const clickedTargetId = parseInt((event.target as HTMLDivElement).id);
      if (!isNaN(clickedTargetId)) {
        setScore(score + 10);
        setTargets(targets.filter((target) => target.id !== clickedTargetId));
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [targets]);

  const renderTargets = () => {
    return targets.map((target) => (
      <div
        key={target.id}
        id={target.id.toString()}
        className="target"
        style={{ top: target.top, left: target.left }}
      ></div>
    ));
  };

  return (
    <main className="container-game flex-col">
      <div className="flex-row header-game">
        <span style={{width:score+'px'}} className=" score-bar"></span>
        <h2>{score}</h2>
      </div>
      <div id="game" ref={gameRef} className="game" onClick={addTarget}>
        {renderTargets()}
      </div>
    </main>
  );
};

export default Solo;
