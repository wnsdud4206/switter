import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  authService,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInSocial,
  updateProfile,
} from "fbase";
import React, { useState } from "react";
import userDocCreator from "services/userDocCreator";
import AuthOtherAccountStyle from "styles/auth/AuthOtherAccountStyle";

const AuthOtherAccount = () => {
  const [error, setError] = useState("");

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      const data = await signInSocial(authService(), provider);

      if (!authService().currentUser.displayName) {
        await updateProfile(authService().currentUser, {
          displayName: authService().currentUser.uid.slice(0, 11),
        });
      }

      console.log(data);
      userDocCreator(data);
    } catch (e) {
      setError(e.code);
      console.error(e);
    }
  };

  return (
    <AuthOtherAccountStyle>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
          <FontAwesomeIcon id="googleSignInImage" icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
          <FontAwesomeIcon id="githubSignInImage" icon={faGithub} />
        </button>
      </div>
      {error && <span>{error}</span>}
    </AuthOtherAccountStyle>
  );
};

export default AuthOtherAccount;
