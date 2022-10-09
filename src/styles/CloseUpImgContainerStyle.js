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

  @media (orientation: portrait) {
    padding: 10vw;
  }

  @media (orientation: landscape) {
    padding: 10vh;
  }

  @media (pointer: coarse) {
    padding: 0;
  }

  box-sizing: border-box;

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

  img {
    background-color: white;
    background-size: 80% auto;

    // 수정해야함, 데스크탑은 여백 있게 모바일은 없게(100%) - 일단 된 것 같은데 코드정리가 필요할 듯

    @media (orientation: portrait) {
      width: 80%;
    }

    @media (orientation: landscape) {
      height: 80%;
    }

    @media (pointer: coarse) and (orientation: portrait) {
      width: 100%;
    }

    @media (pointer: coarse) and (orientation: landscape) {
      height: 100%;
    }

    aspect-ratio: auto 1/1;

    border: 3px solid #00bdee;
    box-sizing: border-box;
  }

  span.imgLoadingBox {
    color: black;
    text-align: center;
  }
`;

export default CloseUpImgContainerStyle;
