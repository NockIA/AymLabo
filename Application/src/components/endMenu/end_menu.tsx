import "./end_menu.css";
import "../../style/global.css";
import { Link } from "react-router-dom";

interface EndMenuProps {
  score: number;
  accuracy: number;
  bestStrike: number;
  targetHits: number;
  totalClics: number;
  close: Function;
  restart: Function;
}

const EndMenu: React.FC<EndMenuProps> = ({
  score,
  accuracy,
  bestStrike,
  targetHits,
  totalClics,
  close,
  restart,
}) => {
  return (
    <div className="flex-col container-end-menu-shadow">
      <div className="flex-col container-end-menu">
        <section className="flex-row container-score-stat ">
          <h2>Score</h2>
          <p>{score}</p>
        </section>
        <section className="flex-row container-stats-buttons">
          <div className="flex-col container-stats">
            <div className="flex-col container-target-stats">
              <div className="flex-row container-stat">
                <h2>Targets hit</h2>
                <p>{targetHits + "x"}</p>
              </div>
            
              <div className="flex-row container-stat">
                <h2>Total clics</h2>
                <p>{totalClics + "x"}</p>
              </div>
            </div>
            <div className="flex-row container-col-stats">
              <div className="flex-col container-col-stat">
                <h2>Best strike</h2>
                <p>{bestStrike + "x"}</p>
              </div>
              <div className="flex-col container-col-stat">
                <h2>Accuracy</h2>
                <p>{!Number.isNaN(accuracy) ? accuracy + '%' : '0%' }</p>
              </div>
            </div>
          </div>
          <div className="flex-col container-buttons">
            <button
              className="buttons-menu-stats"
              onClick={() => {
                restart(true);
              }}
            >
              Restart
            </button>
            <Link className="buttons-menu-stats" to={"/home"}>
              Home
            </Link>
            <button className="buttons-menu-stats" onClick={() => close(false)}>
              Close
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EndMenu;
