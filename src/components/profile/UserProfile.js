import { useEffect, useState } from "react";
import {
  authService,
  signOut,
  dbService,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  collection,
  where,
  onSnapshot,
  deleteUser,
} from "fbase";
import { Link, useNavigate } from "react-router-dom";
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

  const onAccountWithdrawal = async () => {
    const ok = window.confirm("정말로 회원탈퇴를 하시겠습니까?");
    // users, content, comment, follower, follow, notifications
    if (ok) {
      // useGetUser (15line) 을 다시 불러와버려서 에러가 뜨는데 로그아웃부터 해야하나?
      // 일단 users Collection에서 지워는 것 확인
      
      const userDoc = doc(dbService(), "users", userObj.uid);

      const contentQuery = query(
        collection(dbService(), "contents"),
        where("creatorId", "==", userObj.uid),
      );
      const contentSnap = await getDocs(contentQuery);

      const commentQuery = query(
        collection(dbService(), "comments"),
        where("creatorId", "==", userObj.uid),
      );
      const commentSnap = await getDocs(commentQuery);

      contentSnap.docs.forEach(async (content) => {
        const contentDoc = doc(dbService(), "contents", content.id);
        await deleteDoc(contentDoc);
      });
      commentSnap.docs.forEach(async (comment) => {
        const commentDoc = doc(dbService(), "comments", comment.id);
        await deleteDoc(commentDoc);
      });
      await deleteDoc(userDoc);
      await deleteUser(authService().currentUser);
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
          <div id="profileMenuBox">
            {userObj.uid === profileObj.uid ? (
              <nav id="profileMenu">
                <button id="profileMenuHover">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <ul>
                  <li>
                    <button
                      className="profileEditBtn profileMenuBtn"
                      onClick={onEditing}
                      title="editing"
                    >
                      프로필 수정
                    </button>
                  </li>
                  <li>
                    <button className="logOutBtn profileMenuBtn" onClick={onLogOut} title="logout">
                      로그아웃
                    </button>
                  </li>
                  <li>
                    <button
                      className="accountWithdrawalBtn profileMenuBtn"
                      onClick={onAccountWithdrawal}
                    >
                      회원탈퇴
                    </button>
                  </li>
                </ul>
              </nav>
            ) : (
              <FollowToggleBtn userObj={userObj} profileObj={profileObj} />
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
