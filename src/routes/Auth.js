import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import {
  authService,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInSocial,
} from "fbase";
import React from "react";
import userDocCreator from "services/userDocCreator";
import AuthStyle from "styles/AuthStyle";
// 회원탈퇴는?

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInSocial(authService(), provider);

    userDocCreator(data);
  };

  return (
    <AuthStyle>
      <FontAwesomeIcon id="twiterLogo" icon={faTwitter} />
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google 
          <FontAwesomeIcon id="googleLogo" icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github 
          <FontAwesomeIcon id="githubLogo" icon={faGithub} />
        </button>
      </div>
    </AuthStyle>
  );
};

export default Auth;
