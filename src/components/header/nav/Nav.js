import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell as faBellActivate,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavigationProfileImage from "styles/header/NavigationProfileImage";
import NotificationContainer from "./notice/NotificationContainer";
import NavStyle from "styles/header/nav/NavStyle";
import { useDispatch } from "react-redux";
import { editActions } from "../../../store/contentEditStore";

const Nav = ({
  userObj,
  activeNotice,
  toggleNotification,
  onNotification,
  offNotification,
}) => {
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();

  const contentCreate = () => {
    dispatch(editActions.onEdit({ mode: true, content: null }));
  };

  const onError = () => {
    setImgError(true);
  };

  return (
    <NavStyle>
      <ul id="navContainer">
        <li id="newContent">
          <button onClick={contentCreate}>new</button>
        </li>
        <li id="darkMode">
          <button>dark</button>
        </li>
        <li id="notification" className="notice" onClick={toggleNotification}>
          {/* not Link */}
          <FontAwesomeIcon icon={faBellActivate} />
          {/* <FontAwesomeIcon icon={faBell} /> */}
        </li>
        <li id="profileLink">
          <Link id="myProfile" to="/profile">
            {userObj.photoURL && !imgError ? (
              <NavigationProfileImage>
                <img
                  src={userObj.photoURL}
                  width="25px"
                  height="25px"
                  alt="profileImage"
                  onError={onError}
                />
              </NavigationProfileImage>
            ) : (
              <FontAwesomeIcon id="profileicon" icon={faUser} />
            )}
            {/* <span>{userObj.displayName}'s Profile</span> */}
          </Link>
        </li>
      </ul>

      <NotificationContainer
        userObj={userObj}
        activeNotice={activeNotice}
        offNotification={offNotification}
      />
    </NavStyle>
  );
};

export default Nav;
