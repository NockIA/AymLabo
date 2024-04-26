import "./friend.css";
import "../../style/global.css";
import { FriendProps } from "../../models/friend";

export const Friend: React.FC<FriendProps> = ({
  avatar,
  pseudo,
  requestId,
  isRequest,
  acceptRequest,
}) => {
  return (
    <article className="flex-row container-friend">
      <div className="flex-row container-infos">
        <img className="profile-picture" src={`/images/avatar/${avatar}`} />
        <p>{pseudo}</p>
      </div>
      {isRequest && (
        <div className="flex-col container-options">
          <img
            src="/images/icons/check.png"
            alt="accept-request"
            onClick={() => acceptRequest(true, requestId)}
          />
          <img
            src="/images/icons/close.png"
            alt="refuse-request"
            onClick={() => acceptRequest(false, requestId)}
          />
        </div>
      )}
    </article>
  );
};
