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
    const noticeEnable = (e) => {
      if (e.target.classList.contains("notice")) {
        return;
      } else {
        setActiveNotice(false);
        return;
      }
    };

    if (activeNotice) window.addEventListener("click", noticeEnable);
    else window.removeEventListener("click", noticeEnable);
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
