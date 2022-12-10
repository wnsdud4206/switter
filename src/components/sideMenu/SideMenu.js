import FollowToggleBtn from "components/FollowToggleBtn";
import HeaderUserProfile from "components/HeaderUserProfile";
import LoadingBox from "components/loading/LoadingBox";
import { dbService, query, collection, where, onSnapshot } from "fbase";
import { useEffect, useState } from "react";
import SideMenuStyle from "styles/SideMenuStyle";

const SideMenu = ({ userObj }) => {
  const [followUsers, setFollowUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    // getFollowUsers
    const followUserQuery = query(
      collection(dbService(), "users"),
      where("follower", "array-contains-any", [userObj.uid]),
    );

    onSnapshot(followUserQuery, (users) => {
      setFollowUsers([]);
      users.docs.forEach((user) => {
        setFollowUsers((prev) => [...prev, user.data()]);
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
  }, [userObj.follow]);

  return (
    <SideMenuStyle>
      {/* 내 프로파일은 없어도 되려나 */}
      <div id="sideMenuHeader">
        <HeaderUserProfile
          name={userObj.displayName}
          image={userObj.photoURL}
        />
      </div>
      <ul id="followList">
        <h4>팔로우 중인 친구</h4>
        {followUsers?.length ? (
          followUsers.map((user) => (
            <li key={user.uid} className="followUser">
              <HeaderUserProfile
                name={user.displayName}
                image={user.attachmentUrl}
              />

              <FollowToggleBtn
                id="sideFollowBtn"
                userObj={userObj}
                profileObj={user}
              />
            </li>
          ))
        ) : followUsers.length === 0 ? (
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
              <HeaderUserProfile
                name={user.displayName}
                image={user.attachmentUrl}
              />

              <FollowToggleBtn
                id="sideFollowBtn"
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
    </SideMenuStyle>
  );
};

export default SideMenu;
