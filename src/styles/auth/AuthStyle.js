import styled from "styled-components";

const AuthStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;

  svg#twiterLogo {
    color: var(--icon-color);
    height: 70px;
    width: 70px;

    margin-bottom: 16px;
  }
`;

export default AuthStyle;
