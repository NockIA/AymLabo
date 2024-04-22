import "./sign.css";
import "../../style/global.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const SignIn: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password1, setPassword1] = useState("");
  return (
    <main className="container-sign flex-row">
      <section className="container-left-section flex-col">
        <div className="flex-row container-logo">
          <img src="/logo.png" />
          <h5>
            Aym<span>Labo</span>
          </h5>
        </div>
        <div className="flex-col container-content">
          <h2>Improve your aim</h2>
          <p>
            By playing to this game you will improve by 5 times your level in
            any shooting game
          </p>
        </div>
        <Link className="button-sign button-sign-white" to={"/signup"}>
          Sign Up
        </Link>
      </section>
      <span className="separation-sign"></span>
      <section className="flex-col container-right-section">
        <div className="flex-col container-header-form ">
          <h1>Sign In</h1>
          <h2>Connect to your account</h2>
        </div>
        <form className="flex-col container-form">
          <input placeholder="Username" type="text" />
          <input placeholder="Password" type="password" />
          <Link className="password" to={"/forget-password"}>Forget your password ?</Link>
          <button className="button-sign">Sign In</button>
        </form>
      </section>
    </main>
  );
};
