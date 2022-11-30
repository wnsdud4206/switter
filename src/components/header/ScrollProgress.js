import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ScrollProgressStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.8);

  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 1;

  div#progress {
    background-color: var(--icon-color);
    height: 2px;

    transition: width 0.2s ease-out;
  }
`;

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);
  const [originalPathname, setOriginalPathname] = useState("");
  const { pathname } = useLocation();

  const handelScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    setScroll((scrollTop / (scrollHeight - clientHeight)) * 100);
  }, []);

  useEffect(() => {
    if (pathname !== originalPathname) {
      setOriginalPathname(pathname);
      setScroll(0);
    }
    window.addEventListener("scroll", handelScroll, true);
    return () => window.addEventListener("scroll", handelScroll, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handelScroll, pathname]);

  return (
    <ScrollProgressStyle>
      <div id="progress" style={{ width: scroll + "%" }}></div>
    </ScrollProgressStyle>
  );
};

export default ScrollProgress;
