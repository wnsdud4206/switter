import { useCallback, useEffect, useMemo, useState } from "react";
import AppRouter from "components/Router";
import { authService, onAuth } from "fbase";
import GlobalStyle from "styles/GlobalStyle";
import LoadingBox from "styles/LoadingBoxStyle";
import MyHelmet from "./components/MyHelmet";
import useGetUser from "hooks/useGetUser";
import { useSelector } from "react-redux";

function App() {
  const { init, userObj } = useGetUser();
  const darkMode = useSelector((state) => state.darkModeState.mode);

  // useEffect(() => {
  //   console.log(darkMode);
    
  //   // 다크모드 여부
  //   // if (window.localStorage.getItem("darkMode") !== null) {
  //   //   const prefersDark =
  //   //     window.matchMedia &&
  //   //     window.matchMedia("(prefers-color-scheme: Dark)").matches;
  //   //   window.localStorage.setItem("darkMode", prefersDark);
  //   // }

  // }, [darkMode]);

  return (
    <>
      <MyHelmet />

      <GlobalStyle them={darkMode} />
      {/* Loading중 같은 */}
      {init ? (
        <AppRouter
          // refreshUser={refreshUser}
          isLoggedIn={userObj}
          userObj={userObj}
          init={init}
        />
      ) : (
        <LoadingBox>"Initializing..."</LoadingBox>
      )}
      {/* <footer>&copy; Switter {new Date().getFullYear()}</footer> */}
    </>
  );
}

export default App;
