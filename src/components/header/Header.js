import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import HeaderStyle from "styles/header/HeaderStyle";
import ScrollProgress from "./ScrollProgress";
import ScrollTopButton from "components/ScrollTopButton";
import Nav from "./nav/Nav";

const Header = ({ userObj }) => {
  const [activeNotice, setActiveNotice] = useState(false);

  const toggleNotification = () => setActiveNotice(activeNotice ? false : true);

  useEffect(() => {
    const noticeEnable = ({ target }) =>
      !target.classList.contains("notice") && setActiveNotice(false);

    activeNotice
      ? window.addEventListener("click", noticeEnable)
      : window.removeEventListener("click", noticeEnable);
  }, [activeNotice]);

  return (
    <>
      <HeaderStyle>
        <div id="homeLink" title="home">
          <Link to="/">
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
