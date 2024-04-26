import "./avatar.css";
import "../../style/global.css";
import { useState } from "react";

interface AvatarModalProps {
  currentAvatar: string;
  callback: Function;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  callback,
  currentAvatar,
}) => {
  const avatarList: Array<string> = ["bear.png", "panda.png", "rabbit.png"];
  const [avatarSelected, setAvatarSelected] = useState(currentAvatar);
  return (
    <div className="container-avatar-modal-shadow flex-col">
      <section className="flex-col container-avatar-modal">
        <div className="flex-row header-modal">
          <h2>Edit avatar</h2>
          <button onClick={() => callback(avatarSelected)}>Select</button>
        </div>
        <div className="flex-row container-avatars">
          {avatarList.map((avatar, index) => (
            <article
              onClick={() => {
                setAvatarSelected(avatar);
              }}
              style={{
                borderColor:
                  avatarSelected === avatar ? "var(--blue)" : "transparent",
              }}
              className="flex-col container-avatar"
              key={index}
            >
              <img src={"/images/avatar/" + avatar} alt={avatar} />
              <p>{avatar.slice(0, -4)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
