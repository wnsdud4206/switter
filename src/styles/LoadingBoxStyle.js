import styled from "styled-components";

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* color: white; */

  height: 100vh;

  animation: loading 0.75s infinite linear alternate;

  @keyframes loading {
    0% {
      color: black;
    }
    100% {
      color: white;
    }
  }
`;

export default LoadingBox;
