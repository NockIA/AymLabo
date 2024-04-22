import React, { useState, useEffect, useRef } from "react";
import "./solo.css";
import "../../style/global.css";
import { HeaderGame } from "@/components/headerGame/header_game";
import { Target } from "@/components/target/target";

interface Target {
  id: number;
  top: number;
  left: number;
}

const Solo: React.FC = () => {
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);
  const [totalClics, setTotalClics] = useState(0);

  // ------------------------- //
  // ---------Rules----------- //
  // ------------------------- //

  const maxScore: number = 1000;
  const maxTime: number = 30;

  // ------------------------- //
  // ---------Score----------- //
  // ------------------------- //

  useEffect(() => {
    const checkEnd = () => {
      if (score >= maxScore) {
        setScore(0);
        setSeconds(0);
        setTotalClics(0);
        setTotalTargets(0);
      }
      if (seconds > maxTime) {
        setScore(0);
        setTotalClics(0);
        setTotalTargets(0);
        setSeconds(0);
      }
    };
    if (score < 0) {
      setScore(0);
    }
    checkEnd();
  }, [score, seconds]);

  // ------------------------- //
  // ---------Timer----------- //
  // ------------------------- //

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // ------------------------------ //
  // ---------Init Targets--------- //
  // ------------------------------ //

  useEffect(() => {
    const initialTargets: Target[] = generateRandomTargets(4);
    setTargets(initialTargets);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newTargets = generateRandomTargets(4); 
      setTargets(newTargets);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ---------------------------------- //
  // ---------Generate targets--------- //
  // ---------------------------------- //

  useEffect(() => {
    if (targets.length < 3) {
      const newTargets = generateRandomTargets(3 - targets.length);
      setTargets((prevTargets) => [...prevTargets, ...newTargets]);
    } else if (targets.length > 5) {
      setTargets((prevTargets) => prevTargets.slice(0, 5));
    }
  }, [targets]);

  const generateRandomTargets = (count: number): Target[] => {
    const gridRowCount = 3;
    const gridColumnCount = 3;

    const cellWidth = gameRef.current!.offsetWidth / gridColumnCount;
    const cellHeight = gameRef.current!.offsetHeight / gridRowCount;

    const newTargets: Target[] = [];
    for (let i = 0; i < count; i++) {
      let newTarget: Target;
      do {
        const gridX = Math.floor(Math.random() * gridColumnCount);
        const gridY = Math.floor(Math.random() * gridRowCount);
        newTarget = {
          id: Math.floor(Math.random() * 1000),
          top: gridY * cellHeight,
          left: gridX * cellWidth,
        };
      } while (
        targets.some(
          (target) =>
            target.top === newTarget.top && target.left === newTarget.left
        )
      );
      newTargets.push(newTarget);
    }
    return newTargets;
  };

  // ---------------------------------- //
  // ---------Remove targets----------- //
  // ---------------------------------- //

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const clickedTargetId = parseInt((event.target as HTMLDivElement).id);
      if (!isNaN(clickedTargetId)) {
        setScore(score + 10);
        setTargets((prevTargets) =>
          prevTargets.filter((target) => target.id !== clickedTargetId)
        );
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [score, targets]);

  useEffect(() => {
    const handleGlobalClick = () => {
      setTotalClics(totalClics + 1);
    };
    document.body.addEventListener("click", handleGlobalClick);
    return () => {
      document.body.removeEventListener("click", handleGlobalClick);
    };
  }, [totalClics]);

  return (
    <main className="container-game flex-col" role="main">
      <HeaderGame
        score={score}
        time={seconds}
        precison={Math.ceil((totalTargets * 100) / totalClics)}
      />
      <div
        ref={gameRef}
        className="game flex-row"
        onClick={(event) => {
          if (event.target === gameRef.current) {
            setScore(score - 10);
          } else {
            setTotalTargets(totalTargets + 1);
          }
        }}
      >
        {targets.map((target, index) => (
          <Target key={index} target={target} />
        ))}
      </div>
    </main>
  );
};

export default Solo;
