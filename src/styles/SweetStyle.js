import styled, { css } from "styled-components";

const SweetStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  /* width: 100%; */
  /* height: 82px; */

  // paddingBox에 따로 transition 효과 줘야 이미지가 없어질 때 줄어드는 모션을 할듯 이 div는 transition을 하고있는데 paddingBox는 transition이 없으니 확 줄어버리는 것, 이미지도 하면 댓글도 해야할건데... function으로 묶어서 사용해야 할듯
  /* height: ${({ sweetPaddingSize }) => sweetPaddingSize}px;

  transition: height 0.2s ease-out; */

  overflow: hidden;

  animation: boxFadeIn 0.2s;

  @keyframes boxFadeIn {
    0% {
      justify-content: flex-end;
      opacity: 0;
    }
    100% {
      justify-content: flex-end;
      opacity: 1;
    }
  }

  &.fadeout {
    $height-value: ${({ sweetPaddingSize }) => sweetPaddingSize}px;
    animation: boxFadeOut 0.2s ease-out forwards;

    @keyframes boxFadeOut {
      0% {
        justify-content: flex-end;
        opacity: 1;
        height: $height-value;
      }
      100% {
        justify-content: flex-end;
        opacity: 0;
        height: 0;
      }
    }
  }

  &:not(:last-child) > div.sweetPadding {
    padding-bottom: 72px;
  }

  div.sweetPadding {
    div.sweetSize {
      background-color: #222;

      border-radius: 8px;
      border: 2px solid #444;

      box-sizing: border-box;

      overflow: hidden;

      height: ${({ sweetSize }) => sweetSize}px;

      transition: height 0.2s ease-out;

      div.sweetContainer {
        color: white;

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        /* outline: 1px solid red; */

        /* padding: 4px; */
      }
    }
  }
`;

export default SweetStyle;
