import "./leaderboard.css";
import "../../style/global.css";
import { Nav } from "../../components/nav/nav";
import { useEffect, useState } from "react";
import { LeaderboardLimits, LeaderboardProps } from "../../models/leaderboard";
import { PlayerLeaderboard } from "../../components/leaderboard/player_leaderboard";
import { LeaderboardService } from "../../services/leaderboard_service";
import { Store } from "../../services/store";

const Leaderboard: React.FC = () => {
  const _leaderboardService: LeaderboardService = new LeaderboardService();
  const _store: Store = new Store("userData");
  const [datas, setDatas] = useState<LeaderboardProps>();
  const [jwt, setJwt] = useState("");
  const [endpoint, setEndpoint] = useState("score");
  const [limits, setLimits] = useState<LeaderboardLimits>({
    limitMax: 5,
    limitMin: 5,
  });

  // -------------------------- //
  // -----------JWT------------ //
  // -------------------------- //

  useEffect(() => {
    const jwt_store = _store.load();
    if (jwt_store) {
      setJwt(jwt_store);
    }
  }, [jwt]);

  // --------------------------------- //
  // -----------Load datas------------ //
  // --------------------------------- //
  const getLeaderboard = async () => {
    if (jwt.length > 0) {
      const response = await _leaderboardService.getLimitsLeaderboard(
        endpoint,
        jwt
      );
      if (response) {
        console.log(response);

        setDatas(response);
        setLimits({
          limitMin: response.limitMin,
          limitMax: response.limitMax,
        });
      }
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, [endpoint]);

  useEffect(() => {
    getLeaderboard();
  }, [jwt]);

  const expandLeaderboard = async (limitMin: number, limitMax: number) => {
    if (jwt.length > 0) {
      const response = await _leaderboardService.getLeaderboardWithLimits(
        endpoint,
        jwt,
        limitMin,
        limitMax
      );
      if (response) {
        setDatas(response);
      }
    }
  };

  const handlePreviousClick = async () => {
    setLimits((prevLimits) => ({
      limitMax: prevLimits.limitMax,
      limitMin: prevLimits.limitMin + 5,
    }));
    await expandLeaderboard(limits.limitMin + 5, limits.limitMax);
    setDatas((prevDatas) => {
      if (prevDatas) {
        return {
          ...prevDatas,
          limitMin: prevDatas.limitMin + 5,
        };
      }
      return undefined;
    });
  };

  const handleNextClick = async () => {
    setLimits((prevLimits) => ({
      limitMax: prevLimits.limitMax + 5,
      limitMin: prevLimits.limitMin,
    }));
    await expandLeaderboard(limits.limitMin, limits.limitMax + 5);
    setDatas((prevDatas) => {
      if (prevDatas) {
        return {
          ...prevDatas,
          limitMax: prevDatas.limitMax + 5,
        };
      }
      return undefined;
    });
  };

  return (
    <>
      <Nav />
      <main className="flex-col container-leaderboard-page">
        <div className="flex-row container-title-buttons">
          <h1>
            Leader<span>board</span>
          </h1>
          <div className="flex-row container-pagination">
            <div className="flex-row container-sort-btn">
              <button onClick={handlePreviousClick} className="sort-button">
                all
              </button>
              <button onClick={handlePreviousClick} className="sort-button">
                Friends
              </button>
            </div>
            <div className="flex-row container-sort-btn">
              <button onClick={handlePreviousClick} className="see-more-button">
                Previous
              </button>
              <button onClick={handleNextClick} className="see-more-button">
                Next
              </button>
            </div>
          </div>
        </div>

        <section className="flex-col container-leaderboard-content">
          <header className="container-leaderboard-header">
            <h2 className="cell-leaderboard">Rank</h2>
            <h2 className="cell-leaderboard">Username</h2>
            <div
              className="flex-row container-sort"
              onClick={() => setEndpoint("score")}
            >
              <h2 className="cell-leaderboard">Total Score</h2>
              <img
                style={{ display: endpoint === "score" ? "block" : "none" }}
                src="/sort_icon.png"
                alt="sort-icon"
              />
            </div>
            <div
              className="flex-row container-sort"
              onClick={() => setEndpoint("win")}
            >
              <h2 className="cell-leaderboard">Wins</h2>
              <img
                style={{ display: endpoint === "win" ? "block" : "none" }}
                src="/sort_icon.png"
                alt="sort-icon"
              />
            </div>
            <div
              className="flex-row container-sort"
              onClick={() => setEndpoint("loose")}
            >
              <h2 className="cell-leaderboard">Looses</h2>
              <img
                style={{ display: endpoint === "loose" ? "block" : "none" }}
                src="/sort_icon.png"
                alt="sort-icon"
              />
            </div>
            <div
              className="flex-row container-sort"
              onClick={() => setEndpoint("solo")}
            >
              <h2 className="cell-leaderboard">Solo games</h2>
              <img
                style={{ display: endpoint === "solo" ? "block" : "none" }}
                src="/sort_icon.png"
                alt="sort-icon"
              />
            </div>
            <div
              className="flex-row container-sort"
              onClick={() => setEndpoint("acc")}
            >
              <h2 className="cell-leaderboard">Average Accuracy</h2>
              <img
                style={{ display: endpoint === "acc" ? "block" : "none" }}
                src="/sort_icon.png"
                alt="sort-icon"
              />
            </div>
            <div
              className="flex-row container-sort"
              onClick={() => setEndpoint("kps")}
            >
              <h2 className="cell-leaderboard">KpS</h2>
              <img
                style={{ display: endpoint === "kps" ? "block" : "none" }}
                src="/sort_icon.png"
                alt="sort-icon"
              />
            </div>
          </header>
          <div className="flex-col">
            {datas?.top5 &&
              Object.values(datas.top5).map((player, index) => (
                <PlayerLeaderboard
                  key={index}
                  isSelectedPlayer={player.isSelectedPlayer}
                  avgAccuracy={player.avgAccuracy}
                  uuid={player.uuid}
                  pseudo={player.pseudo}
                  avatar={player.avatar}
                  ranking={player.ranking}
                  totalScore={player.totalScore}
                  numberGameLoose={player.numberGameLoose}
                  numberGameWin={player.numberGameWin}
                  numberOfSoloGamePlay={player.numberOfSoloGamePlay}
                  kps={player.kps}
                />
              ))}
          </div>
          <div className="flex-col">
            <article className="container-player-leader separation-leaderboard">
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
              <div className="flex-row cell-leaderboard cell-leaderboard-user">
                <h2 className="cell-leaderboard-stats"> ...</h2>
              </div>
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
              <h2 className="cell-leaderboard cell-leaderboard-stats">...</h2>
            </article>
            {datas?.data &&
              Object.values(datas.data).map((player, index) => (
                <PlayerLeaderboard
                  key={index}
                  isSelectedPlayer={player.isSelectedPlayer}
                  avgAccuracy={player.avgAccuracy}
                  uuid={player.uuid}
                  pseudo={player.pseudo}
                  avatar={player.avatar}
                  ranking={player.ranking}
                  totalScore={player.totalScore}
                  numberGameLoose={player.numberGameLoose}
                  numberGameWin={player.numberGameWin}
                  numberOfSoloGamePlay={player.numberOfSoloGamePlay}
                  kps={player.kps}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Leaderboard;
