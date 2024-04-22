import "./target.css";
import "../../style/global.css";

interface TargetProps {
  target: { top: number; left: number; id: number };
}

export const Target: React.FC<TargetProps> = ({ target }) => {
  return (
    <div
      id={target.id.toString()}
      className="target flex-col"
      style={{ top: target.top, left: target.left }}
    >
      <span></span>
    </div>
  );
};
