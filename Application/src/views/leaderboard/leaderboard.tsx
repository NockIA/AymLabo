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
  }, [jwt]);

  const expandLeaderboard = async (limitMin: number, limitMax: number) => {
    if (jwt.length > 0 && limits?.limitMax && limits.limitMin) {
      const response = await _leaderboardService.getLeaderboardWithLimits(
        endpoint,
        jwt,
        limitMin,
        limitMax
      );
      if (response) {
        setDatas(response);
        await getLeaderboard();
        console.log(response);
      }
    }
  };

  return (
    <>
      <Nav />
      <main className="flex-col container-leaderboard-page">
        <h1>
          Leader<span>board</span>
        </h1>
        <section className="flex-col container-leaderboard-content">
          <header className="container-leaderboard-header">
            <h2 className="cell-leaderboard">Rank</h2>
            <h2 className="cell-leaderboard">Username</h2>
            <h2 className="cell-leaderboard">TT Score</h2>
            <h2 className="cell-leaderboard">Wins</h2>
            <h2 className="cell-leaderboard">Looses</h2>
            <h2 className="cell-leaderboard">TT games</h2>
            <h2 className="cell-leaderboard">Avg Accuracy</h2>
            <h2 className="cell-leaderboard">KpS</h2>
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
          <div className="flex-row">
            <button
              onClick={async () => {
                setLimits({
                  limitMax: limits?.limitMax,
                  limitMin: limits?.limitMin + 5,
                });
                await expandLeaderboard(limits?.limitMin + 5, limits?.limitMax);
              }}
              className="see-more-button"
            >
              Previous
            </button>
            <button
              onClick={async () => {
                setLimits({
                  limitMax: limits?.limitMax + 5,
                  limitMin: limits?.limitMin,
                });
                await expandLeaderboard(limits?.limitMin, limits?.limitMax + 5);
              }}
              className="see-more-button"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Leaderboard;
