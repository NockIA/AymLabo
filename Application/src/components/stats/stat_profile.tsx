import "./stat_profile.css";
import "../../style/global.css";
import { StatProfileProps } from "../../models/stat";

export const StatProfile: React.FC<StatProfileProps> = ({ title, value }) => {
  const formatStat = (data: number): string => {
    if (data >= 1000000) {
      return (data / 1000000).toString() + "M";
    }
    return data.toString();
  };
  return (
    <article className="flex-col container-stat-profile">
      <img src="/target.png" />
      <h2>{title}</h2>
      <p>{formatStat(value)}</p>
    </article>
  );
};
