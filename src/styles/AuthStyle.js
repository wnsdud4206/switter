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
    height: 70px;
    width: 70px;

    margin-bottom: 16px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;


      button {
        height: 36px;
        background: #eee;
        outline: none;
        border: none;
        border-radius: 18px;
        box-sizing: border-box;
        font-weight: bold;

        padding: 0 12px;
        margin: 24px 0 16px;

        cursor: pointer;

        svg#googleSignInImage,
        svg#githubSignInImage {
          margin-left: 4px;
        }
      }
    }

    span {
      color: #ff6633;

      flex-wrap: nowrap;
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
