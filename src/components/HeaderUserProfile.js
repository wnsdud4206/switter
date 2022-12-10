import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderUserProfileStyle = styled(Link)`
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

const HeaderUserProfile = ({ name, image }) => {
  const [imgError, setImgError] = useState(false);

  const onError = () => setImgError(true);

  return (
    <HeaderUserProfileStyle className="UserLink" to={`/profile/${name}`}>
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
          <FontAwesomeIcon
            className="UserAttachmentIcon"
            icon={faUser}
          />
        )}
      </div>
      <span className="UserName">{name}</span>
    </HeaderUserProfileStyle>
  );
};

export default HeaderUserProfile;
