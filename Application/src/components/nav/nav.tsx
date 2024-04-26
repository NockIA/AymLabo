import { Link } from "react-router-dom";
import "./nav.css";
import "../../style/global.css";
import { FriendService } from "../../services/friend_service";
import { useEffect, useState } from "react";
import { FriendAndRequestProps, FriendProps } from "../../models/friend";
import { Friend } from "../friend/friend";
import { Store } from "../../services/store";

export const Nav: React.FC = () => {
  const _friendService: FriendService = new FriendService();
  const _store: Store = new Store("userData");
  const [data, setData] = useState<FriendAndRequestProps>();
  const [newFriend, setNewFriend] = useState("");
  const [showFriends, setShowFriends] = useState(true);
  const [jwt, setJwt] = useState("");
  const [message, setMessage] = useState("");

  // -------------------------- //
  // -----------JWT------------ //
  // -------------------------- //

  useEffect(() => {
    const jwt_store = _store.load();
    if (jwt_store) {
      setJwt(jwt_store);
    }
  }, [jwt]);

  // --------------------------- //
  // -----------Load------------ //
  // --------------------------- //

  const getFriends = async () => {
    if (jwt.length > 0) {
      const response = await _friendService.getFriendsAndRequests(jwt);
      if (response.data) {
        setData(response.data);
      }
    }
  };

  useEffect(() => {
    getFriends();
  }, [jwt, showFriends]);

  // --------------------------- //
  // -----------Send------------ //
  // --------------------------- //

  const handleSubmitRequest = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (jwt.length > 0) {
      const response = await _friendService.requestFriend(newFriend, jwt);
      if (response) {
        setMessage(response);
      } else {
        setMessage("Error while trying to send");
      }
      setNewFriend("");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleRequest = async (accept: boolean, idRequest: string) => {
    if (jwt.length > 0) {
      if (accept) {
        await _friendService.acceptFriendRequest(idRequest, jwt);
        await getFriends();
      } else {
        await _friendService.refuseFriendRequest(idRequest, jwt);
        await getFriends();
      }
    }
  };

  return (
    <nav className="container-nav flex-col">
      <Link className="flex-row container-header-nav" to={"/home"}>
        <img src="/images/icons/icon.png" alt="Home logo" />
        <h5>
          Aym<span>Labo</span>
        </h5>
      </Link>
      <span className="separation-nav">.</span>
      <div className="flex-col container-global-links">
        <h2 className="subtitle-nav ">Menu</h2>
        <ul className="flex-col container-links">
          <li className="flex-col ">
            <Link className="flex-row container-link" to={"/solo"}>
              <img src="/images/icons/pistol.png" alt="Solo gamemode" />
              <p>Solo</p>
            </Link>
          </li>
          <li className="flex-col ">
            <Link className="flex-row container-link" to={"/leaderboard"}>
              <img src="/images/icons/ranking.png" alt="leaderboard" />
              <p>Leaderboard</p>
            </Link>
          </li>
          <li className="flex-col ">
            <Link className="flex-row container-link" to={"/profile"}>
              <img src="/images/icons/user.png" alt="profile" />
              <p>My profile</p>
            </Link>
          </li>
        </ul>
      </div>
      <span className="separation-nav">.</span>
      <div className="flex-col container-new-friend">
        <h2 className="subtitle-nav ">Add friend</h2>
        <form onSubmit={handleSubmitRequest}>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setNewFriend(e.target.value)}
          />
        </form>

        {message && <p className="error-message">{message}</p>}
      </div>
      <span className="separation-nav">.</span>
      <div className="flex-col container-friends-requests ">
        <h2 className="subtitle-nav ">Friends</h2>
        <div className="flex-row container-selection-friends">
          <div
            style={{
              borderColor:
                showFriends === true ? "var(--separation-nav)" : "transparent",
            }}
            className="flex-row container-selection "
            onClick={() => setShowFriends(true)}
          >
            <img src="/images/icons/friends.png" alt="friend-icon" />
            <h5>Friends</h5>
          </div>
          <div
            style={{
              borderColor:
                showFriends === false ? "var(--separation-nav)" : "transparent",
            }}
            className="flex-row container-selection "
            onClick={() => setShowFriends(false)}
          >
            <img src="/images/icons/add-friend.png" alt="friend-icon" />
            <h5>Request</h5>
          </div>
        </div>
        <div className="flex-col container-friends">
          {showFriends ? (
            data?.myFriends && Object.keys(data?.myFriends).length > 0 ? (
              Object.values(data?.myFriends).map((friend, index) => (
                <Friend
                  isRequest={false}
                  key={index}
                  avatar={friend.avatar}
                  pseudo={friend.pseudo}
                  acceptRequest={handleRequest}
                />
              ))
            ) : (
              <p className="error-message">No friends added</p>
            )
          ) : data?.requests && Object.keys(data?.requests).length > 0 ? (
            Object.values(data?.requests).map((friend, index) => (
              <Friend
                isRequest
                requestId={friend.requestId}
                key={index}
                avatar={friend.avatar}
                pseudo={friend.pseudo}
                acceptRequest={handleRequest}
              />
            ))
          ) : (
            <p className="error-message">No requests</p>
          )}
        </div>
      </div>
    </nav>
  );
};
