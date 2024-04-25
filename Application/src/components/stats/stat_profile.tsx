import "./stat_profile.css";
import "../../style/global.css";
import { StatProfileProps } from "../../models/stat";

export const StatProfile: React.FC<StatProfileProps> = ({ title, value }) => {
    // if target more that 1 million round to 1M
    return (
    <article className="flex-col container-stat-profile">
      <img src="/target.png" />
      <h2>{title}</h2>
      <p>{value}</p>
    </article>
  );
};
