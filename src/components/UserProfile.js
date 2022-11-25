import { useEffect, useState } from "react";
import {
  authService,
  signOut,
  dbService,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "fbase";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileStyle from "styles/UserProfileStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faRightFromBracket,
  faUser,
  faUserMinus,
  faUserPen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as refUser } from "@fortawesome/free-regular-svg-icons";

const UserProfile = ({ userObj, profileObj, onEditing }) => {
  // userObj는 현재 접속중인 user, profile 주인의 uesr정보가 필요
  const [contentCount, setContentCount] = useState(0);
  const [currentUserFollow, setCurrentUserFollow] = useState(false);
  const [imgError, setImgError] = useState(false);

  const navigate = useNavigate();

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  useEffect(() => {
    const contentQuery = query(
      collection(dbService(), "contents"),
      where("creatorId", "==", profileObj.uid),
    );
    onSnapshot(contentQuery, (snapshot) => {
      const count = snapshot.docs.length;

      setContentCount(count);
    });

    profileObj.follower?.includes(userObj.uid) && setCurrentUserFollow(true);
  }, []);

  const onFollowToggle = async () => {
    // notifications, users
    const userDoc = doc(dbService(), "users", userObj.uid);
    const profileDoc = doc(dbService(), "users", profileObj.uid);
    const noticeDoc = doc(dbService(), "notifications", profileObj.uid);
    await setDoc(
      userDoc,
      {
        follow: currentUserFollow
          ? arrayRemove(profileObj.uid)
          : arrayUnion(profileObj.uid),
      },
      { merge: true },
    );
    await setDoc(
      profileDoc,
      {
        follower: currentUserFollow
          ? arrayRemove(userObj.uid)
          : arrayUnion(userObj.uid),
      },
      { merge: true },
    );
    await setDoc(
      noticeDoc,
      {
        follower: {
          [userObj.uid]: currentUserFollow
            ? deleteField()
            : {
                confirmed: false,
                lastUpdate: Date.now(),
                category: "follower",
              },
        },
      },
      { merge: true },
    );
  };

  const onLogOut = () => {
    signOut(authService());
    navigate("/", { replace: true });
  };

  return (
    <UserProfileStyle>
      <div id="attachmentProfile">
        <div id="userAttachment">
          {profileObj?.attachmentUrl && !imgError && (
            <img
              src={profileObj.attachmentUrl}
              width="150px"
              height="150px"
              alt="userAttachment"
              onError={onError}
            />
          )}
        </div>
      </div>

      <div id="textProfile">
        <div id="textProfileHeader">
          <h2 id="userName">{profileObj?.displayName}</h2>
          <div id="profileActions">
            {/* profile 주인은 안보이게 */}
            {userObj.uid !== profileObj.uid && (
              <button id="followToggle" onClick={onFollowToggle}>
                {currentUserFollow ? (
                  <>
                    <FontAwesomeIcon className="followIcon" icon={faUser} />
                    <FontAwesomeIcon
                      className="unFollowIconHover"
                      icon={faUserMinus}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon className="unFollowIcon" icon={refUser} />
                    <FontAwesomeIcon
                      className="followIconHover"
                      icon={faUserPlus}
                    />
                  </>
                )}
              </button>
            )}
            {/* profile 주인만 보이게 */}
            {userObj.uid === profileObj.uid && (
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
                    <button id="logOutBtn" onClick={onLogOut} title="logout">
                      로그아웃
                      {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                    </button>
                  </li>
                  <li>
                    <button id="accountWithdrawalBtn">회원탈퇴</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>

        <ul>
          <li>
            게시글 <b>{contentCount}</b>
          </li>
          <li>
            팔로워 <b>{profileObj.follower?.length | 0}</b>
          </li>
          <li>
            팔로우 <b>{profileObj.follow?.length | 0}</b>
          </li>
        </ul>

        {/* 글자 수 제한, input이 아니라 textarea? */}
        <p>{profileObj?.introduce || "아직 내 소개를 작성하지 않았어요!😪"}</p>
      </div>
    </UserProfileStyle>
  );
};

export default UserProfile;
