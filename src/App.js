import AppRouter from "components/Router";
import GlobalStyle from "styles/GlobalStyle";
import MyHelmet from "./components/MyHelmet";
import useGetUser from "hooks/useGetUser";
import { useSelector } from "react-redux";
import LoadingBox from "components/loading/LoadingBox";

function App() {
  const { userObj, init } = useGetUser();
  const darkMode = useSelector((state) => state.darkModeState.mode);

  return (
    <>
      <MyHelmet />

      <GlobalStyle them={darkMode} />
      {init ? (
        <AppRouter
          isLoggedIn={userObj}
          userObj={userObj}
        />
      ) : (
        <LoadingBox text={"Initializing"} />
      )}
    </>
  );
}

export default App;
