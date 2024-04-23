import "./target.css";
import "../../style/global.css";
import { TargetProps } from "@/models/game";

export const Target: React.FC<TargetProps> = ({ id, top, left }) => {
  return (
    <div
      id={id.toString()}
      className="target flex-col"
      style={{ top: top, left: left }}
    >
      <span></span>
    </div>
  );
};
