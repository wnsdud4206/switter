import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell as faBellActivate,
  faCircleHalfStroke,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavigationUserImage from "styles/header/NavigationUserImage";
import NotificationContainer from "./notice/NotificationContainer";
import NavStyle from "styles/header/nav/NavStyle";
import { useDispatch, useSelector } from "react-redux";
import { editActions } from "../../../reducers/contentEditReducer";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { darkModeActions } from "reducers/darkModeReducer";

const Nav = ({
  userObj,
  activeNotice,
  toggleNotification,
  onNotification,
  offNotification,
}) => {
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkModeState.mode);

  const contentCreate = () => {
    dispatch(editActions.onEdit({ mode: true, content: null }));
  };

  const onError = () => {
    setImgError(true);
  };

  const onDarkModeToggle = () => {
    darkMode
      ? dispatch(darkModeActions.light({ mode: false }))
      : dispatch(darkModeActions.dark({ mode: true }));
  };

  return (
    <NavStyle>
      <ul id="navContainer">
        <li id="newContent" title="newContent">
          <button onClick={contentCreate}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </li>
        <li id="darkMode" title="darkMode">
          <button onClick={onDarkModeToggle}>
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          </button>
        </li>
        <li
          id="notification"
          className="notice"
          onClick={toggleNotification}
          title="notice"
        >
          {/* not Link */}
          <FontAwesomeIcon icon={faBellActivate} />
          {/* <FontAwesomeIcon icon={faBell} /> */}
        </li>
        <li id="profileLink" title="myProfile">
          <Link id="myProfile" to={`/profile/${userObj.displayName}`}>
            {userObj.photoURL && !imgError ? (
              <NavigationUserImage>
                <img
                  src={userObj.photoURL}
                  width="25px"
                  height="25px"
                  alt="userImage"
                  onError={onError}
                  loading="lazy"
                />
              </NavigationUserImage>
            ) : (
              <FontAwesomeIcon id="usericon" icon={faUser} />
            )}
            {/* <span>{userObj.displayName}'s User</span> */}
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
