import { Link } from "react-router-dom";
import "./nav.css";
import '../../style/global.css';

export const Nav: React.FC = () => {
  return (
    <nav className="container-nav flex-col">
      <header className="flex-col container-logo">
        <Link className="flex-row container-link" to={"/home"}>
          <img src="/logo.png" alt="Home logo" />
          <h5>Aym<span>Labo</span></h5>
        </Link>
        <span className="separation-nav" />
      </header>
      <div className="flex-col">
        <ul className="flex-col">
          <li className="flex-col container-links">
            <Link className="flex-row container-link" to={"/solo"}>
              <img src="/pistol.png" alt="Solo gamemode" />
              <p>Solo</p>
            </Link>
            <Link className="flex-row container-link" to={"/multi"}>
              <img src="/pistol.png" alt="Multi gamemode" />
              <p>Multi</p>
            </Link>
            <Link  className="flex-row container-link" to={"/ia"}>
              <img src="/pistol.png" alt="Versus ia gamemode" />
              <p>IA</p>
            </Link>
          </li>
        </ul>
      </div>
      <span className="separation-nav"  />
      <div className="flex-col">
        <ul className="flex-col">
          <li className="flex-col container-links">
            <Link className="flex-row container-link" to={"/leaderboard"}>
              <img src="/ranking.png" alt="leaderboard" />
              <p>Leaderboard</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-col container-links">
        <span className="separation-nav"  />
        <Link className="flex-row container-link" to={"/profile"}>
          <img src="/user.png" alt="profile" />
          <p>My profile</p>
        </Link>
      </div>
    </nav>
  );
};
