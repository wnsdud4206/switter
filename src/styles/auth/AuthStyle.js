import styled from "styled-components";

const AuthStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;

  header#authHeader {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    
    svg#twiterLogo {
      color: var(--icon-color);
      height: 70px;
      width: 70px;

      margin-bottom: 16px;
    }

    span {
    }

    button {
      justify-self: flex-end;
      align-self: flex-end;
    }
  }

  footer {
    color: rgba(128, 128, 128, 0.8);
    margin-top: 16px;

    position: fixed;
    bottom: 8px;
  }
`;

export default AuthStyle;
