import { useState } from "react";
import { authService, signOut } from "fbase";
import { useNavigate } from "react-router-dom";
import UserProfileStyle from "styles/UserProfileStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faRightFromBracket,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

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
          <nav id="profileMenu">
            <button id="profileMenuBtn">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <ul>
              <li>
                <button
                  className="profileEditBtn"
                  onClick={onEditing}
                  title="editing"
                >
                  프로필 수정
                  {/* <FontAwesomeIcon icon={faUserPen} /> */}
                </button>
              </li>
              <li>
                <button id="logOutBtn" onClick={onLogOutClick} title="logout">
                  로그아웃
                  {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                </button>
              </li>
              <li>
                <button id="accountWithdrawalBtn">회원탈퇴</button>
              </li>
            </ul>
          </nav>
        </div>

        <ul>
          <li>
            게시글 <b>n</b>
          </li>
          <li>
            팔로워 <b>n</b>
          </li>
          <li>
            팔로우 <b>n</b>
          </li>
        </ul>

        {/* 글자 수 제한, input이 아니라 textarea? */}
        <p>{userObj?.introduce || "아직 내 소개를 작성하지 않았어요!😪"}</p>
      </div>
    </UserProfileStyle>
  );
};

export default UserProfile;
