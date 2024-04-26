import "./player_leaderboard.css";
import "../../style/global.css";
import { PlayerLearderboardProps } from "../../models/leaderboard";

export const PlayerLeaderboard: React.FC<PlayerLearderboardProps> = ({
  isSelectedPlayer,
  uuid,
  pseudo,
  ranking,
  avatar,
  totalScore,
  numberGameWin,
  numberGameLoose,
  avgAccuracy,
  numberOfSoloGamePlay,
  killPerSeconde,
}) => {
  return (
    <article style={{backgroundColor : isSelectedPlayer ? ' var(--blue)' : ' var(--background-sign)'}} key={uuid} className="container-player-leader">
      <h2 className="cell-leaderboard cell-leaderboard-stats">{ranking}</h2>
      <div className="flex-row cell-leaderboard cell-leaderboard-user">
        <img src={`/avatar/${avatar}`} />
        <h2 className="cell-leaderboard-stats">{pseudo}</h2>
      </div>
      <h2 className="cell-leaderboard cell-leaderboard-stats">{totalScore}</h2>
      <h2 className="cell-leaderboard cell-leaderboard-stats">{numberGameWin}</h2>
      <h2 className="cell-leaderboard cell-leaderboard-stats">{numberGameLoose}</h2>
      <h2 className="cell-leaderboard cell-leaderboard-stats">{numberOfSoloGamePlay}</h2>
      <h2 className="cell-leaderboard cell-leaderboard-stats">{avgAccuracy}</h2>
      <h2 className="cell-leaderboard cell-leaderboard-stats">{killPerSeconde}</h2>
    </article>
  );
};
