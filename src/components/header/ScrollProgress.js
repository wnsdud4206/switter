import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ScrollProgressStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.8);

  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  div#progress {
    /* background-color: #00acee; */
    background-color: #9953e2;
    height: 2px;

    transition: width .2s ease-out;
  }
`;

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  const handelScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    setScroll((scrollTop / (scrollHeight - clientHeight)) * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelScroll, true);
    return () => {
      window.addEventListener("scroll", handelScroll, true);
    };
  }, [handelScroll]);

  return (
    <ScrollProgressStyle>
      <div id="progress" style={{ width: scroll + "%" }}></div>
    </ScrollProgressStyle>
  );
};

export default ScrollProgress;
