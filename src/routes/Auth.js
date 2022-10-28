import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/auth/AuthForm";
import AuthOtherAccount from "components/auth/AuthOtherAccount";
import React from "react";
import AuthStyle from "styles/auth/AuthStyle";
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
