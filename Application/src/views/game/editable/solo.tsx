import React, { useState, useEffect, useRef } from "react";
import "../solo.css";
import "../../../style/global.css";
import { HeaderGame } from "../../../components/headerGame/header_game";
import { Target } from "../../../components/target/target";
import EndMenu from "../../../components/endMenu/end_menu";
import { TargetProps } from "../../../models/game";
import axios from "axios";
import { apiKey, apiURL } from "../../../utils/api";
import { Store } from "../../../services/store";

const SoloParams: React.FC = () => {
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: window.innerHeight / 2 - 200,
    left: window.innerWidth / 2 - 100,
  });
  const gameRef = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState(0);
  const [totalClics, setTotalClics] = useState(0);
  const [totalHits, setTotalHits] = useState(0); // Track total hits on target
  const [showMenu, setShowMenu] = useState(false);
  const [jwt, setJwt] = useState<string | null>();
  const [isMouseOverTarget, setIsMouseOverTarget] = useState(false);
  const _store: Store = new Store("userData");

  // ------------------------- //
  // ---------Rules----------- //
  // ------------------------- //

  const maxScore: number = 10000;
  const maxTime: number = 30; // seconds
  let velocityX = 1.5; // horizontal speed of target
  let velocityY = 1.5; // vertical speed of target

  // ------------------------- //
  // ----------Jwt------------ //
  // ------------------------- //

  useEffect(() => {
    const jwt_store = _store.load();
    if (jwt_store) {
      setJwt(jwt_store);
    }
  }, [jwt]);

  // ---------------------------------- //
  // ---------------Submit------------- //
  // ---------------------------------- //

  const handleEndGame = async () => {
    const datas = {
      timePlayedInSecond: seconds,
      numberOfTargetDown: totalHits,
      accuracy: Math.ceil((totalHits * 100) / totalClics),
      bestStrike: 1,
      score: score,
    };
    if (seconds >= maxTime && jwt && score > 0) {
      try {
        await axios.post(`${apiURL}/soloPlay`, datas, {
          headers: {
            Authorization: apiKey + ":" + jwt,
          },
        });
      } catch (error: any) {
        throw new Error(`Couldn't save game datas : ${error.message}`);
      }
    }
  };

  // ------------------------- //
  // ---------Menu------------ //
  // ------------------------- //

  const handleMenuModal = (data: boolean) => {
    setShowMenu(data);
    if (seconds >= maxTime || score >= maxScore) {
      restart(true);
    }
    setTotalClics(totalClics - 1);
  };

  const handleEchap = (event: { key: string }) => {
    if (event.key === "Escape") {
      if (seconds >= maxTime || score >= maxScore) {
        setShowMenu(true);
      } else {
        setShowMenu((prevShowMenu) => !prevShowMenu);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEchap);
    return () => {
      document.removeEventListener("keydown", handleEchap);
    };
  }, []);

  const restart = async (restart: boolean) => {
    if (restart) {
      console.log('restart');
      
      await handleEndGame();
      setScore(0);
      setSeconds(0);
      setTotalClics(0);
      setTotalHits(0);
      setShowMenu(false);
    }
  };

  // ------------------------- //
  // ---------Score----------- //
  // ------------------------- //

  useEffect(() => {
    const checkEnd = () => {
      if (score >= maxScore) {
        setShowMenu(true);
      }
      if (seconds >= maxTime) {
        setShowMenu(true);
      }
    };
    if (score < 0) {
      setScore(0);
    }
    checkEnd();
  }, [score, seconds]);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsMouseOverTarget(true);
    };

    const handleMouseLeave = () => {
      setIsMouseOverTarget(false);
    };

    const targetElement = gameRef.current?.querySelector(".target");
    if (targetElement) {
      targetElement.addEventListener("mouseenter", handleMouseEnter);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        targetElement.removeEventListener("mouseenter", handleMouseEnter);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    if (!showMenu) {
      let intervalId: NodeJS.Timeout | null = null;

      if (isMouseOverTarget) {
        intervalId = setInterval(() => {
          setScore((prevScore) => prevScore + 10);
          setTotalHits((prevTotalHits) => prevTotalHits + 2);
        }, 50);
      } else {
        clearInterval(intervalId as unknown as NodeJS.Timeout);
      }

      return () => {
        clearInterval(intervalId as NodeJS.Timeout);
      };
    }
  }, [isMouseOverTarget, showMenu]);

  useEffect(() => {
    if (!showMenu) {
      let intervalId: NodeJS.Timeout | null = null;

      intervalId = setInterval(() => {
        setTotalClics((prevTotalClics) => prevTotalClics + 1);
      }, 50);

      return () => {
        clearInterval(intervalId as NodeJS.Timeout);
      };
    }
  }, [showMenu]);

  // ------------------------- //
  // ---------Timer----------- //
  // ------------------------- //

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (!showMenu) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showMenu]);

  // -------------------------- //
  // ---------Target----------- //
  // -------------------------- //

  useEffect(() => {
    if (seconds === 0) {
      console.log('aaaa');
      
      setTargetPosition({
        top: window.innerHeight / 2 - 200,
        left: window.innerWidth / 2 - 100,
      });
    } else {
      let targetPosition = {
        top: window.innerHeight / 2 - 200,
        left: window.innerWidth / 2 - 100,
      };
      const targetWidth = 150;
      const targetHeight = 250;
      if (seconds == 0 || seconds >= maxTime) {
        targetPosition = {
          top: window.innerHeight / 2 - 200,
          left: window.innerWidth / 2 - 100,
        };
      }
      const moveTarget = () => {
        // move randomly horizontally the target
        if (Math.random() < 0.01) {
          velocityX *= -1;
        }
        // move randomly vertically the target
        if (Math.random() < 0.01) {
          velocityY *= -1;
        }
        targetPosition.left += velocityX;
        targetPosition.top += velocityY;

        // Check if target hits horizontal borders
        if (targetPosition.left <= 0) {
          targetPosition.left = 0;
          velocityX = Math.abs(velocityX);
        } else if (targetPosition.left >= window.innerWidth - targetWidth) {
          targetPosition.left = window.innerWidth - targetWidth;
          velocityX = -Math.abs(velocityX);
        }
        // Check if target hits vertical borders
        if (targetPosition.top <= 0) {
          targetPosition.top = 0;
          velocityY = Math.abs(velocityY);
        } else if (targetPosition.top >= window.innerHeight - targetHeight) {
          targetPosition.top = window.innerHeight - targetHeight;
          velocityY = -Math.abs(velocityY);
        }

        // update target position

        setTargetPosition({ ...targetPosition });

        animationId = requestAnimationFrame(moveTarget);
      };

      let animationId = requestAnimationFrame(moveTarget);

      return () => cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <main className="container-game flex-col" role="main">
      <HeaderGame
        score={score}
        time={seconds}
        precision={Math.ceil((totalHits * 100) / totalClics)}
      />
      <div
        ref={gameRef}
        className="game-params flex-row"
        style={{ position: "relative" }}
      >
        <Target
          target={{ id: 1, top: targetPosition.top, left: targetPosition.left }}
        />
      </div>
      {showMenu && (
        <EndMenu
          bestStrike={0}
          score={score}
          accuracy={Math.ceil((totalHits * 100) / totalClics)}
          targetHits={totalHits}
          totalClics={totalClics < 0 ? 0 : totalClics}
          close={handleMenuModal}
          restart={restart}
        />
      )}
    </main>
  );
};

export default SoloParams;
