import User from "components/User";
import LoadingBox from "components/loading/LoadingBox";
import { dbService, query, collection, where, onSnapshot } from "fbase";
import { useEffect, useState } from "react";
import SideBarStyle from "styles/sideBar/SideBarStyle";
import { useDispatch, useSelector } from "react-redux";
import { sideBarActions } from "reducers/SideBarReducer";

const SideBar = ({ userObj }) => {
  const [userArr, setUserArr] = useState([]);
  const [userType, setUserType] = useState(true);
  const [randomUsers, setRandomUsers] = useState([]);
  const dispatch = useDispatch();
  const sideBarState = useSelector((state) => state.sideBarState.mode);

  useEffect(() => {
    const userQuery = query(
      collection(dbService(), "users"),
      where(userType ? "follower" : "follow", "array-contains-any", [
        userObj.uid,
      ]),
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

  const backgroundCloseSideBar = ({ target }) => {
    target.id.includes("sideBarContainer") &&
      dispatch(sideBarActions.toggleSideBar(false));
  };

  const closeSideBar = () => dispatch(sideBarActions.toggleSideBar(false));

  return (
    <SideBarStyle
      className={sideBarState ? "show" : "hide"}
      onClick={backgroundCloseSideBar}
    >
      {/* ??? ??????????????? ????????? ????????? */}
      <div id="sideBarContainer">
        <div id="sideBarHeader" onClick={closeSideBar}>
          <User name={userObj.displayName} image={userObj.photoURL} />
        </div>
        <ul id="followList">
          <div id="listHeader">
            <h4>{userType ? "?????????" : "?????????"} ??????</h4>
            <button id="userTypeToggleBtn" onClick={toggleUserType}>
              {userType ? "?????????" : "?????????"} ?????? ??????
            </button>
          </div>
          {userArr?.length ? (
            userArr.map((user) => (
              // component??? ????????? ????????? ?????????, ????????? ??????????????? ????????????
              <li key={user.uid} className="followUser" onClick={closeSideBar}>
                <User
                  name={user.displayName}
                  image={user.attachmentUrl}
                  userObj={userObj}
                  profileObj={user}
                />
              </li>
            ))
          ) : userArr.length === 0 ? (
            <li id="emptyFollowList">?????? ????????? ?????? ????????? ?????????!????</li>
          ) : (
            <LoadingBox text="?????????????????????..." />
          )}
        </ul>
        <ul id="randomList">
          <h4>?????? ??????</h4>
          {randomUsers ? (
            randomUsers.map((user) => (
              <li key={user.uid} className="randomUser" onClick={closeSideBar}>
                <User
                  name={user.displayName}
                  image={user.attachmentUrl}
                  userObj={userObj}
                  profileObj={user}
                />
              </li>
            ))
          ) : (
            <LoadingBox text="??????????????????????????????..." />
          )}
        </ul>
        <footer>
          Copyright &copy; {new Date().getFullYear()} By SongJunYoung
        </footer>
      </div>

      {/* transition: transLateX, useState(boolean), className */}
      {/* <button id="sideBarToggle">
        <FontAwesomeIcon icon={faUsers} />
      </button> */}
    </SideBarStyle>
  );
};

export default SideBar;
