import styled, { css } from "styled-components";

const CloseUpImgContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  cursor: pointer;

  z-index: 100;

  animation: fadeIn 0.2s forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &.visible {
    animation: fadeOut 0.2s forwards;

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }

  div.closeUpImgSize {
    ${({ innerSize }) =>
      innerSize
        ? css`
            width: 80vh;
            height: 80vh;
          `
        : css`
            width: 80vw;
            height: 80vw;
          `}

    /* 모바일 세로모드 */
      @media (orientation: portrait) {
      width: 100vw;
      height: 100vw;
    }
    /* 모바일 가로모드 */
    @media (orientation: landscape) {
      width: 100vh;
      height: 100vh;
    }

    img {
    }
  }
`;

export default CloseUpImgContainerStyle;
