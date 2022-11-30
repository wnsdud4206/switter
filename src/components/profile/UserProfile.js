import { useEffect, useState } from "react";
import {
  authService,
  signOut,
  dbService,
  query,
  collection,
  where,
  onSnapshot,
  deleteUser,
} from "fbase";
import { useNavigate } from "react-router-dom";
import UserProfileStyle from "styles/home/UserProfileStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import FollowToggleBtn from "components/FollowToggleBtn";

const UserProfile = ({ userObj, profileObj, onEditing }) => {
  const [contentCount, setContentCount] = useState(0);
  const [imgError, setImgError] = useState(false);

  const navigate = useNavigate();

  const onError = () => setImgError(true);

  useEffect(() => {
    const contentQuery = query(
      collection(dbService(), "contents"),
      where("creatorId", "==", profileObj.uid),
    );
    onSnapshot(contentQuery, (snapshot) => {
      const count = snapshot.docs.length;

      setContentCount(count);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogOut = () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      signOut(authService());
      navigate("/", { replace: true });
    }
  };

  const onAccountWithdrawal = () => {
    const ok = window.confirm("정말로 회원탈퇴를 하시겠습니까?");
    if (ok) {
      deleteUser(authService().currentUser);
      navigate("/", { replace: true });
    }
  };

  return (
    <UserProfileStyle>
      <div id="attachmentProfile">
        <div id="userAttachment">
          {profileObj.attachmentUrl && !imgError ? (
            <img
              src={profileObj.attachmentUrl}
              width="150px"
              height="150px"
              alt="userAttachment"
              onError={onError}
            />
          ) : (
            <FontAwesomeIcon className="profileAttachmenticon" icon={faUser} />
          )}
        </div>
      </div>

      <div id="textProfile">
        <div id="textProfileHeader">
          <h2 id="userName">{profileObj?.displayName}</h2>
          <div id="profileActions">
            {/* profile 주인은 안보이게 */}
            {userObj.uid !== profileObj.uid && (
              <FollowToggleBtn userObj={userObj} profileObj={profileObj} />
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
                    </button>
                  </li>
                  <li>
                    <button id="logOutBtn" onClick={onLogOut} title="logout">
                      로그아웃
                    </button>
                  </li>
                  <li>
                    <button
                      id="accountWithdrawalBtn"
                      onClick={onAccountWithdrawal}
                    >
                      회원탈퇴
                    </button>
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

        <p>{profileObj?.introduce || "아직 내 소개를 작성하지 않았어요!😪"}</p>
      </div>
    </UserProfileStyle>
  );
};

export default UserProfile;
