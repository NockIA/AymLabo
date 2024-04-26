import "./leaderboard.css";
import "../../style/global.css";
import { Nav } from "../../components/nav/nav";
import { useState } from "react";
import { PlayerLearderboardProps } from "../../models/leaderboard";
import { PlayerLeaderboard } from "../../components/leaderboard/player_leaderboard";

const Leaderboard: React.FC = () => {
  const [top5, setTop5] = useState<PlayerLearderboardProps[]>();
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
            <h2 className="cell-leaderboard">Total Score</h2>
            <h2 className="cell-leaderboard">Wins</h2>
            <h2 className="cell-leaderboard">Looses</h2>
            <h2 className="cell-leaderboard">Total games</h2>
            <h2 className="cell-leaderboard">Average Accuracy</h2>
            <h2 className="cell-leaderboard">KpS</h2>
          </header>
          <div className="flex-col">
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={true}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
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
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
            <PlayerLeaderboard
              isSelectedPlayer={false}
              avgAccuracy={21.0}
              uuid="fezzzzzzzzzzfzf"
              pseudo="SahowPlf"
              avatar="panda.png"
              ranking={47}
              totalScore={15150}
              numberGameLoose={51}
              numberGameWin={541}
              numberOfSoloGamePlay={15156}
              killPerSeconde={1.52}
            />
          </div>
          <button className="see-more-button">Voir plus</button>
        </section>
      </main>
    </>
  );
};

export default Leaderboard;
