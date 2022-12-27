import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/auth/AuthForm";
import AuthOtherAccount from "components/auth/AuthOtherAccount";
import DarkModeButton from "components/DarkModeButton";
import React from "react";
import AuthStyle from "styles/auth/AuthStyle";

const Auth = () => (
  <AuthStyle className="authPage">
    <header id="authHeader">
      <DarkModeButton />
      <FontAwesomeIcon id="twiterLogo" icon={faTwitter} />
      <span>SWITTER</span>
    </header>
    <AuthForm />
    <AuthOtherAccount />
    <footer>Copyright &copy; {new Date().getFullYear()} By SongJunYoung</footer>
  </AuthStyle>
);

export default Auth;
