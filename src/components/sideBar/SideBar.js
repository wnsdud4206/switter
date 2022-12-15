import FollowToggleBtn from "components/FollowToggleBtn";
import User from "components/User";
import LoadingBox from "components/loading/LoadingBox";
import { dbService, query, collection, where, onSnapshot } from "fbase";
import { useEffect, useState } from "react";
import SideBarStyle from "styles/sideBar/SideBarStyle";

const SideBar = ({ userObj }) => {
  const [userArr, setUserArr] = useState([]);
  const [userType, setUserType] = useState(true);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const userQuery = query(
      collection(dbService(), "users"),
      where(userType ? "follower" : "follow", "array-contains-any", [userObj.uid]),
    );

    onSnapshot(userQuery, (users) => {
      setUserArr([]);
      users.docs.forEach((user) => {
        setUserArr((prev) => [...prev, user.data()]);
      });
    });

    // getRandomUsers
    const randomUserQuery = query(
      collection(dbService(), "users"),
      where("follower", "not-in", [userObj.uid]),
    );

    onSnapshot(randomUserQuery, (users) => {
      let i = 0;
      setRandomUsers([]);
      users.docs
        .sort(() => 0.5 - Math.random())
        .forEach((user) => {
          if (
            i === 10 ||
            userObj.follow?.includes(user.id) ||
            userObj.uid === user.id
          )
            return;
          setRandomUsers((prev) => [...prev, user.data()]);
          i++;
        });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userObj.follow, userType]);

  const toggleUserType = () => {
    setUserType((prev) => !prev);
  };

  return (
    <SideBarStyle>
      {/* 내 프로파일은 없어도 되려나 */}
      <div id="sideBarHeader">
        <User name={userObj.displayName} image={userObj.photoURL} />
      </div>
      <ul id="followList">
        <div id="listHeader">
          <h4>{userType ? "팔로우" : "팔로워"} 목록</h4>
          <button id="userTypeToggleBtn" onClick={toggleUserType}>
            {userType ? "팔로워" : "팔로우"} 목록 보기
          </button>
        </div>
        {userArr?.length ? (
          userArr.map((user) => (
            // component화 시켜서 여기랑 팔로워, 팔로우 목록에서도 사용하기
            <li key={user.uid} className="followUser">
              <User
                name={user.displayName}
                image={user.attachmentUrl}
                userObj={userObj}
                profileObj={user}
              />
            </li>
          ))
        ) : userArr.length === 0 ? (
          <li id="emptyFollowList">아직 팔로우 중인 친구가 없어요!😪</li>
        ) : (
          <LoadingBox text="친구불러오는중..." />
        )}
      </ul>
      <ul id="randomList">
        <h4>추천 친구</h4>
        {randomUsers ? (
          randomUsers.map((user) => (
            <li key={user.uid} className="randomUser">
              <User
                name={user.displayName}
                image={user.attachmentUrl}
                userObj={userObj}
                profileObj={user}
              />
            </li>
          ))
        ) : (
          <LoadingBox text="추천할친구불러오는중..." />
        )}
      </ul>
      <footer>
        Copyright &copy; {new Date().getFullYear()} By SongJunYoung
      </footer>
    </SideBarStyle>
  );
};

export default SideBar;
