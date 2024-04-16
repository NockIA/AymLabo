import React from "react";
import "./link.css";

interface link {
  name: string;
  url: string;
  imgUrl: string;
}

export const LinkComp: React.FC<link> = ({ name, url, imgUrl }) => {
  return (
    <li className="flex-row container-link">
      <a href={url} className="flex-row">
        {/* <img src={"./App/src/assets/pistol.png"} alt={name} /> */}
        <p>{name}</p>
      </a>
    </li>
  );
};
