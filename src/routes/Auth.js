import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import AuthOtherAccount from "components/AuthOtherAccount";
import React from "react";
import AuthStyle from "styles/AuthStyle";
// 회원탈퇴는?

const Auth = () => {
  return (
    <AuthStyle className="authPage">
      <FontAwesomeIcon id="twiterLogo" icon={faTwitter} />
      SWITTER(임시)
      <AuthForm />
      <AuthOtherAccount />
    </AuthStyle>
  );
};

export default Auth;
