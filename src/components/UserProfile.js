import { useState } from "react";
import { authService, signOut } from "fbase";
import { useNavigate } from "react-router-dom";
import UserProfileStyle from "styles/UserProfileStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUserPen } from "@fortawesome/free-solid-svg-icons";

const UserProfile = ({ userObj, onEditing }) => {
  const [imgError, setImgError] = useState(false);

  const navigate = useNavigate();

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const onLogOutClick = () => {
    signOut(authService());
    navigate("/", { replace: true });
  };

  return (
    <UserProfileStyle>
      <div id="attachmentProfile">
        {userObj.photoURL && !imgError && (
          <div id="userAttachment">
            <img
              src={userObj.photoURL}
              width="150px"
              height="150px"
              alt="userAttachment"
              onError={onError}
            />
          </div>
        )}
      </div>

      <div id="textProfile">
        <div id="textProfileHeader">
          <h2 id="userName">{userObj.displayName}</h2>
          <div id="textProfileActions">
            <button id="profileEditBtn" onClick={onEditing} title="editing">
              <FontAwesomeIcon icon={faUserPen} />
            </button>
            <button id="logOutBtn" onClick={onLogOutClick} title="logout">
            <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        </div>

        {/* <span>게시글 n    팔로워 n    팔로우 n</span> */}

        {/* 글자 수 제한, input이 아니라 textarea? */}
        <p>내 소개</p>
      </div>
    </UserProfileStyle>
  );
};

export default UserProfile;
