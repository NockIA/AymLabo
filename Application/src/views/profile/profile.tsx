import "./profile.css";
import "../../style/global.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StatProfile } from "../../components/stats/stat_profile";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  return (
    <main className="container-profile flex-row">
      <section className="flex-col">
        <img src="" alt="" />
        <button>Change avatar</button>
        <form>
          <fieldset>
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Enter a username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={email}
              placeholder="Enter an email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <Link to={"/reset-password"}>Edit your password</Link>
          <button>Submit</button>
        </form>
      </section>
      <section className="container-stats ">
        <StatProfile title="Targets Hit" value={3600} />
        <StatProfile title="Targets Hissssssssst" value={3600} />
        <StatProfile title="Targets Hit" value={360000000} />
        <StatProfile title="Targets Hit" value={3600} />
        <StatProfile title="Targets Hit" value={3600} />
      </section>
    </main>
  );
};

export default Profile;
