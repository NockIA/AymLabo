import React from "react";
import { LinkComp } from "./link/link";
import "./nav.css";

export const Nav: React.FC = () => {
  return (
    <nav className="container-nav flex-column">
      <ul>
        <LinkComp name="Solo" url="/solo" imgUrl="pistol" />
        <LinkComp name="1 vs IA" url="/ia" imgUrl="pistol" />
        <LinkComp name="1 vs 1" url="/duel" imgUrl="pistol" />
      </ul>
      <span className="separation-nav"></span>
      <ul>
        <LinkComp name="Solo" url="/solo" imgUrl="pistol" />
        <LinkComp name="1 vs IA" url="/ia" imgUrl="pistol" />
        <LinkComp name="1 vs 1" url="/duel" imgUrl="pistol" />
      </ul>
    </nav>
  );
};
