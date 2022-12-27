import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as faBellActivate,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import NavigationUserImage from "styles/header/NavigationUserImage";
import NotificationContainer from "./notice/NotificationContainer";
import NavStyle from "styles/header/nav/NavStyle";
import { useDispatch, useSelector } from "react-redux";
import { editActions } from "../../../reducers/contentEditReducer";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import DarkModeButton from "components/DarkModeButton";
import IconButtonStyle from "styles/IconButtonStyle";
import { sideBarActions } from "reducers/SideBarReducer";

const Nav = ({ userObj, activeNotice, toggleNotification }) => {
  const [imgError, setImgError] = useState(false);
  const [newNotice, setNewNotice] = useState(false);
  const dispatch = useDispatch();
  const sideBarState = useSelector((state) => state.sideBarState.mode);

  const contentCreate = () =>
    dispatch(editActions.onEdit({ mode: true, content: null }));

  const onError = () => setImgError(true);

  const onNewNotice = (bool) => setNewNotice(bool);

  const closeSideBar = () => {
    dispatch(sideBarActions.toggleSideBar(false));
  };

  const toggleSideBar = () =>
    dispatch(sideBarActions.toggleSideBar(sideBarState ? false : true));

  return (
    <NavStyle>
      <ul id="navContainer">
        <li id="newContent" title="newContent" onClick={closeSideBar}>
          <IconButtonStyle onClick={contentCreate}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </IconButtonStyle>
        </li>
        <li id="darkMode" title="darkMode" onClick={closeSideBar}>
          <DarkModeButton />
        </li>
        <li id="sideBarToggle" title="sideBarToggle">
          <IconButtonStyle id="sideBarToggleBtn" onClick={toggleSideBar}>
            <FontAwesomeIcon icon={faUsers} />
          </IconButtonStyle>
        </li>
        <li
          id="notification"
          className="notice"
          title="notice"
          onClick={closeSideBar}
        >
          <IconButtonStyle className="notice" onClick={toggleNotification}>
            <FontAwesomeIcon icon={faBellActivate} />
            <div id="noticeOnIcon" className={newNotice ? "enable" : ""}></div>
          </IconButtonStyle>
        </li>
        <li id="profileLink" title="myProfile" onClick={closeSideBar}>
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
