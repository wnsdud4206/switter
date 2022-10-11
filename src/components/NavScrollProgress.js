import { useCallback, useEffect, useState } from "react";
import NavScrollProgressStyle from "styles/NavScrollProgressStyle";

const NavScrollProgress = () => {
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
    <NavScrollProgressStyle>
      <div id="progress" style={{ width: scroll + "%" }}></div>
    </NavScrollProgressStyle>
  );
};

export default NavScrollProgress;
