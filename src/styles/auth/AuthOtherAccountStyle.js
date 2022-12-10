import styled from "styled-components";

const AuthOtherAccountStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;

    width: 100%;

    button {
      height: 36px;
      background: #eee;
      outline: none;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;

      border: 1px solid var(--border-color);
      border-radius: 18px;
      box-sizing: border-box;

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
`;

export default AuthOtherAccountStyle;
