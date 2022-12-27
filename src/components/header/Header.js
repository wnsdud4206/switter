import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import HeaderStyle from "styles/header/HeaderStyle";
import ScrollProgress from "./ScrollProgress";
import ScrollTopButton from "components/ScrollTopButton";
import Nav from "./nav/Nav";
import { sideBarActions } from "reducers/SideBarReducer";
import { useDispatch } from "react-redux";

const Header = ({ userObj }) => {
  const [activeNotice, setActiveNotice] = useState(false);
  const dispatch = useDispatch();

  const toggleNotification = () => setActiveNotice(activeNotice ? false : true);

  useEffect(() => {
    const noticeEnable = ({ target }) =>
      !target.classList.contains("notice") && setActiveNotice(false);

    activeNotice
      ? window.addEventListener("click", noticeEnable)
      : window.removeEventListener("click", noticeEnable);
  }, [activeNotice]);

  const closeSideBar = () => dispatch(sideBarActions.toggleSideBar(false));

  return (
    <>
      <HeaderStyle>
        <div id="homeLink" title="home">
          <Link to="/" onClick={closeSideBar}>
            <FontAwesomeIcon id="twitterIcon" icon={faTwitter} />
          </Link>
        </div>

        <Nav
          userObj={userObj}
          activeNotice={activeNotice}
          toggleNotification={toggleNotification}
        />
      </HeaderStyle>

      <ScrollProgress />
      <ScrollTopButton />
    </>
  );
};

export default Header;
