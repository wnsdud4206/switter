import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ScrollTopButtonStyle = styled.button`
  border: none;
  outline: none;

  display: flex;
  justify-content: center;

  /* background-color: #00bdee; */
  background-color: var(--icon-color);

  width: 50px;
  height: 50px;

  border-radius: 50%;

  position: fixed;
  left: 50vw;
  bottom: 0;

  z-index: 1;

  transform: translate(-50%, 110%);

  transition: transform 0.2s;

  cursor: pointer;

  &.up {
    transform: translate(-50%, 50%);

    &:hover {
      transform: translate(-50%, 50%) scale(1.1, 1.1);
    }
  }

  svg {
    color: white;

    width: 24px;
    height: 24px;
  }
`;

const ScrollTopButton = () => {
  // const [scrollY, setScrollY] = useState(window.scrollY);
  const [moveTopBtn, setMoveTopBtn] = useState(false);
  const [originalPathname, setOriginalPathname] = useState("");
  const { pathname } = useLocation();

  const onScrollTop = () => {
    window.scrollTo(0, 0);
  };

  const onMoveTopBtn = useCallback(() => {
    // setScrollY(window.scrollY);

    if (window.scrollY < 100) {
      setMoveTopBtn(false);
    } else {
      setMoveTopBtn(true);
    }
  }, []);

  useEffect(() => {
    if (pathname !== originalPathname) {
      setOriginalPathname(pathname);
      onScrollTop();
    }
    window.addEventListener("scroll", onMoveTopBtn, true);
    // console.log("window: " + window.scrollY);
    // console.log("scrollY: " + scrollY);
    return () => {
      window.addEventListener("scroll", onMoveTopBtn, true);
    };
  }, [onMoveTopBtn, pathname]);

  return (
    <>
      <ScrollTopButtonStyle
        id="moveTop"
        className={`${moveTopBtn ? "up" : ""}`}
        onClick={onScrollTop}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </ScrollTopButtonStyle>
    </>
  );
};

export default ScrollTopButton;
