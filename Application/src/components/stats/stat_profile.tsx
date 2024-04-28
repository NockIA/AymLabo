import "./stat_profile.css";
import "../../style/global.css";
import { StatProfileProps } from "../../models/stat";
import target_icon from "/images/icons/target.png";

export const StatProfile: React.FC<StatProfileProps> = ({ title, value }) => {
  const formatStat = (data: string): string => {
    if (parseInt(data) >= 1000000) {
      return (parseInt(data) / 1000000).toString() + "M";
    }
    return data.toString();
  };
  return (
    <article className="flex-col container-stat-profile">
      <img src={target_icon} />
      <h2>{title}</h2>
      <p>{formatStat(value)}</p>
    </article>
  );
};
