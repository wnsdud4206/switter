import styled, { css } from "styled-components";
import LoadingIcon from "./LoadingIcon";

const LoadingBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding-top: 24px;
  box-sizing: border-box;

  ${({ initial }) =>
    initial &&
    css`
      height: 100vh;
    `}

  h3 {
    color: var(--sub-color);
  }
`;

const LoadingBox = ({ text }) => (
  <LoadingBoxStyle
    id="contentsLoading"
    initial={text === "Initializing" ? true : false}
  >
    <LoadingIcon />
    <h3>{text}</h3>
  </LoadingBoxStyle>
);

export default LoadingBox;
