import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FollowToggleBtn from "components/FollowToggleBtn";
import { dbService, query, collection, where, getDocs } from "fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenuStyle from "styles/SideMenuStyle";

const SideMenu = ({ userObj }) => {
  const [followUsers, setFollowUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [imgError, setImgError] = useState(false);

  const onError = () => setImgError(true);

  const getFollowUsers = async () => {
    const userQuery = query(
      collection(dbService(), "users"),
      where("follower", "array-contains-any", [userObj.uid]),
    );
    const users = await getDocs(userQuery);

    let followArr = [];
    setFollowUsers([]);
    users.docs.forEach((doc) => (followArr = [...followArr, doc.data()]));
    setFollowUsers(followArr);
  };

  const getRandomUsers = async () => {
    const userQuery = query(
      collection(dbService(), "users"),
      where("follower", "not-in", [userObj.uid]),
    );
    const users = await getDocs(userQuery);

    let randomArr = [];
    let i = 0;
    setRandomUsers([]);
    users.docs
      .sort(() => 0.5 - Math.random())
      .forEach((doc) => {
        if (i === 10 || userObj.follow.includes(doc.id)) return;
        randomArr = [...randomArr, doc.data()];
        i++;
      });
    setRandomUsers(randomArr);
  };

  useEffect(() => {
    getFollowUsers();
    getRandomUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userObj]);

  return (
    <SideMenuStyle>
      {/* 내 프로파일은 없어도 되려나 */}
      <div id="sideMenuHeader">
        <Link
          className="currentUserLink"
          to={`/profile/${userObj.displayName}`}
        >
          <div className="currentUserAttachment">
            {userObj.photoURL ? (
              <img
                src={userObj.photoURL}
                width="40"
                height="40"
                alt="currentUserAttachment"
                onError={onError}
              ></img>
            ) : (
              <FontAwesomeIcon
                className="currentUserAttachmentIcon"
                icon={faUser}
              />
            )}
          </div>
          <span className="currentUserName">{userObj.displayName}</span>
        </Link>
      </div>
      <ul id="followList">
        <h4>팔로우 중인 친구</h4>
        {followUsers ? (
          followUsers.map((user) => (
            <li key={user.uid} className="followUser">
              <Link
                className="followUserLink"
                to={`/profile/${user.displayName}`}
              >
                <div className="followUserAttachment">
                  {user?.attachmentUrl && !imgError ? (
                    <img
                      src={user.attachmentUrl}
                      width="40"
                      height="40"
                      alt="followUserAttachment"
                      onError={onError}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="followUserAttachmentIcon"
                      icon={faUser}
                    />
                  )}
                </div>

                <span className="followUserName">{user.displayName}</span>
              </Link>

              <FollowToggleBtn
                id="sideFollowBtn"
                userObj={userObj}
                profileObj={user}
              />
            </li>
          ))
        ) : (
          <div id="emptyFollowList">notFollowUsers</div>
        )}
      </ul>
      <ul id="randomList">
        <h4>추천 친구</h4>
        {randomUsers ? (
          randomUsers.map((user) => (
            <li key={user.uid} className="randomUser">
              <Link
                className="randomUserLink"
                to={`/profile/${user.displayName}`}
              >
                <div className="randomUserAttachment">
                  {user?.attachmentUrl && !imgError ? (
                    <img
                      src={user.attachmentUrl}
                      width="40"
                      height="40"
                      alt="randomUserAttachment"
                      onError={onError}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="randomUserAttachmentIcon"
                      icon={faUser}
                    />
                  )}
                </div>

                <span className="randomUserName">{user.displayName}</span>
              </Link>

              <FollowToggleBtn
                id="sideFollowBtn"
                userObj={userObj}
                profileObj={user}
              />
            </li>
          ))
        ) : (
          <div>loading</div>
        )}
      </ul>
      <footer>
        Copyright &copy; {new Date().getFullYear()} By SongJunYoung
      </footer>
    </SideMenuStyle>
  );
};

export default SideMenu;
