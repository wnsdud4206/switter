import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import ScrollTopButtonStyle from "styles/ScrollTopButtonStyle";

const ScrollTopButton = () => {
  // const [scrollY, setScrollY] = useState(window.scrollY);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const onScrollTop = () => {
    window.scrollTo(0, 0);
  };

  const onShowTopBtn = useCallback(() => {
    // setScrollY(window.scrollY);

    if (window.scrollY < 100) {
      setShowTopBtn(false);
    } else {
      // if (window.scrollY > scrollY) {
      //   setTopBtnAni(false);
      //   console.log(false);
      // } else if (window.scrollY < scrollY) {
      //   setTopBtnAni(true);
      //   console.log(true);
      // }
      setShowTopBtn(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onShowTopBtn, true);
    // console.log("window: " + window.scrollY);
    // console.log("scrollY: " + scrollY);
    return () => {
      window.addEventListener("scroll", onShowTopBtn, true);
    };
  }, [onShowTopBtn]);

  return (
    <>
      <ScrollTopButtonStyle
        className={`${showTopBtn ? "up" : ""}`}
        onClick={onScrollTop}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </ScrollTopButtonStyle>
    </>
  );
};

export default ScrollTopButton;
