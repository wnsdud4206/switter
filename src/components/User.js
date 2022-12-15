import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FollowToggleBtn from "./FollowToggleBtn";

const UserStyle = styled(Link)`
  display: flex;
  align-items: center;

  text-decoration: none;

  div {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    background-color: white;

    border-radius: 50%;
    overflow: hidden;

    width: 40px;
    height: 40px;

    img {
      vertical-align: middle;
    }

    svg {
      color: var(--icon-color);
      font-size: 32px;
    }
  }

  span {
    color: var(--sub-color);

    margin-left: 8px;
  }
`;

const User = ({ name, image, userObj, profileObj, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const onError = () => setImgError(true);

  return (
    <>
      <UserStyle
        className="UserLink"
        to={`/profile/${name}`}
        onClick
      >
        <div className="UserAttachment">
          {image && !imgError ? (
            <img
              src={image}
              width="40"
              height="40"
              alt="UserAttachment"
              onError={onError}
              loading="lazy"
            />
          ) : (
            <FontAwesomeIcon className="UserAttachmentIcon" icon={faUser} />
          )}
        </div>
        <span className="UserName">{name}</span>
      </UserStyle>

      {(userObj && profileObj) && (
        <FollowToggleBtn userObj={userObj} profileObj={profileObj} />
      )}
    </>
  );
};

export default User;
