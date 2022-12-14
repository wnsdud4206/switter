import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as faBellActivate,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavigationUserImage from "styles/header/NavigationUserImage";
import NotificationContainer from "./notice/NotificationContainer";
import NavStyle from "styles/header/nav/NavStyle";
import { useDispatch } from "react-redux";
import { editActions } from "../../../reducers/contentEditReducer";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import DarkModeButton from "components/DarkModeButton";

const Nav = ({ userObj, activeNotice, toggleNotification }) => {
  const [imgError, setImgError] = useState(false);
  const [newNotice, setNewNotice] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log();
  // }, []);
  
  const contentCreate = () =>
    dispatch(editActions.onEdit({ mode: true, content: null }));

  const onError = () => setImgError(true);

  const onNewNotice = (bool) => setNewNotice(bool);

  return (
    <NavStyle>
      <ul id="navContainer">
        <li id="newContent" title="newContent">
          <button onClick={contentCreate}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </li>
        <li id="darkMode" title="darkMode">
          {/* <button onClick={onDarkModeToggle}>
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          </button> */}
          <DarkModeButton />
        </li>
        <li
          id="notification"
          className="notice"
          onClick={toggleNotification}
          title="notice"
        >
          <FontAwesomeIcon icon={faBellActivate} />
          <div id="noticeOnIcon" className={newNotice ? "enable" : ""}></div>
        </li>
        <li id="profileLink" title="myProfile">
          <Link id="myProfile" to={`/profile/${userObj.displayName}`}>
            {userObj.photoURL && !imgError ? (
              <NavigationUserImage>
                <img
                  src={userObj.photoURL}
                  width="26px"
                  height="26px"
                  alt="userImage"
                  onError={onError}
                  loading="lazy"
                />
              </NavigationUserImage>
            ) : (
              <FontAwesomeIcon id="usericon" icon={faUser} />
            )}
          </Link>
        </li>
      </ul>

      <NotificationContainer
        userObj={userObj}
        activeNotice={activeNotice}
        onNewNotice={onNewNotice}
      />
    </NavStyle>
  );
};

export default Nav;
