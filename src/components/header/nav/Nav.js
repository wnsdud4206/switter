import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell as faBellActivate,
  faCircleHalfStroke,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavigationProfileImage from "styles/header/NavigationProfileImage";
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
        <li id="newContent">
          <button onClick={contentCreate}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </li>
        <li id="darkMode">
          <button onClick={onDarkModeToggle}>
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          </button>
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
                  loading="lazy"
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
