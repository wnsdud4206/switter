import AppRouter from "components/Router";
import GlobalStyle from "styles/GlobalStyle";
import useGetUser from "hooks/useGetUser";
import { useSelector } from "react-redux";
import LoadingBox from "components/loading/LoadingBox";
// import MyHelmet from "./components/MyHelmet";
import { Helmet, HelmetProvider } from "react-helmet-async";

const helmetContext = {};

function App() {
  const { userObj, init } = useGetUser();
  const darkMode = useSelector((state) => state.darkModeState.mode);

  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        {/* 카카오톡에서 적용하는데 시간이 걸린다고 함 - https://wnsdud4206.github.io/switter/ */}
        <meta name="type" content="website" />
        <meta name="url" content="https://wnsdud4206.github.io/switter/" />
        <meta name="title" content="Switter" />
        <meta name="keyword" content="Switter, SNS, portfolio" />
        <meta name="author" content="JOKA ARCH" />
        <meta name="description" content="개인 포트폴리오 SNS 서비스" />
        <meta name="site_name" content="Switter" />
        <meta name="locale" content="ko_KR" />
        <meta
          name="image"
          content="https://firebasestorage.googleapis.com/v0/b/switter-53663.appspot.com/o/Switter_logo%2FTwitter-logo-png-1.png?alt=media&token=b5c3198c-177f-4374-a80c-f12f5de6aa01"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://wnsdud4206.github.io/switter/"
        />
        <meta property="og:title" content="Switter" />
        <meta property="og:keyword" content="Switter, SNS, portfolio" />
        <meta property="og:author" content="JOKA ARCH" />
        <meta property="og:description" content="개인 포트폴리오 SNS 서비스" />
        <meta property="og:site_name" content="Switter" />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/switter-53663.appspot.com/o/Switter_logo%2FTwitter-logo-png-1.png?alt=media&token=b5c3198c-177f-4374-a80c-f12f5de6aa01"
        />

        <meta name="twitter:card" content="Switter SNS Portfolio" />
        <meta
          name="twitter:url"
          content="https://wnsdud4206.github.io/switter/"
        />
        <meta name="twitter:title" content="Switter" />
        <meta name="twitter:description" content="개인 포트폴리오 SNS 서비스" />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/switter-53663.appspot.com/o/Switter_logo%2FTwitter-logo-png-1.png?alt=media&token=b5c3198c-177f-4374-a80c-f12f5de6aa01"
        />

        <meta http-equiv="content-script-type" content="text/javascript" />
        <meta http-equiv="generator" content="Visual Studio Code" />
        <meta http-equiv="Copyright" content="JOKA ARCH" />

        <title>Switter</title>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/switter-53663.appspot.com/o/Switter_logo%2FTwitter-logo-png-1.png?alt=media&token=b5c3198c-177f-4374-a80c-f12f5de6aa01"
        />
      </Helmet>
      {/* <MyHelmet /> */}

      <GlobalStyle them={darkMode} />
      {init ? (
        <AppRouter userObj={userObj} />
      ) : (
        <LoadingBox text={"Initializing"} />
      )}
    </HelmetProvider>
  );
}

export default App;
