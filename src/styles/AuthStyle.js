import styled from "styled-components";

const AuthStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 36px; */

  width: 100%;
  height: 100%;

  svg#twiterLogo {
    color: #00acee;
    height: 50px;
    width: 50px;

    margin-bottom: 32px;
  }

  div {
    display: flex;
    justify-content: space-between;

    width: 100%;

    button {
      height: 36px;
      background: #eee;
      outline: none;
      border: none;
      border-radius: 18px;
      box-sizing: border-box;
      font-weight: bold;

      padding: 0 12px;
      margin-top: 32px;

      cursor: pointer;

      svg#googleSignInImage,
      svg#githubSignInImage {
        margin-left: 4px;
      }
    }
  }
`;

export default AuthStyle;

/* <div>
<AuthForm />
<div>
  <button onClick={onSocialClick} name="google">
    Continue with Google
  </button>
  <button onClick={onSocialClick} name="github">
    Continue with Github
  </button>
</div>
</div> */
