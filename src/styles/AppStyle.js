import styled from "styled-components";

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  animation: loading .75s infinite linear alternate;

  @keyframes loading {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default LoadingBox;