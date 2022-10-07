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

        ${(props) =>
          props.editing
            ? css`
                form {
                  display: flex;
                  flex-direction: column;
                  align-items: center;

                  flex: auto;

                  width: 100%;

                  div.textEditWrap {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: space-between;

                    width: 100%;

                    div.btnWrap {
                      display: flex;
                      flex-direction: row;
                      // 임시
                      justify-content: flex-end;

                      width: 100%;
                      height: 37px;

                      margin-bottom: 8px;
                      padding: 0 8px;
                      border-bottom: 2px solid #444;
                      border-bottom-left-radius: 8px;
                      border-bottom-right-radius: 8px;
                      box-sizing: border-box;

                      label {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        padding: 1px 4px 0;

                        color: #444;
                        cursor: pointer;

                        transition: color 0.2s;

                        &:hover {
                          color: #00bdee;
                        }

                        svg {
                          width: 14px;
                          height: 14px;
                        }

                        input[type="submit"] {
                          display: none;
                        }
                      }

                      button {
                        background: none;
                        border: none;
                        outline: none;
                        color: #444;

                        padding: 0 3px 0 4px;

                        transition: color 0.2s;

                        cursor: pointer;

                        &:hover {
                          color: #ff6633;
                        }

                        svg {
                          width: 18px;
                          height: 18px;
                        }
                      }
                    }

                    input {
                    }

                    /* input[type="text"] { */
                    div.paddingBox {
                      width: 100%;

                      padding: 24px 0 20px;

                      box-sizing: border-box;

                      textarea {
                        outline: none;
                        border: none;
                        background-color: transparent;
                        color: white;

                        font-size: 16px;
                        font-family: "Malgun Gothic";
                        line-height: 24px;

                        width: 100%;
                        /* height: ${({ textareaHeight }) =>
                          textareaHeight !== 0 && textareaHeight}px; */
                        /* height: ${({ textareaHeight }) =>
                          textareaHeight}px; */
                        // 너무 느려져짐
                        min-height: 120px;

                        resize: none;

                        padding: 0 12px;
                        border-top: 2px solid #444;
                        border-bottom: 2px solid #444;
                        box-sizing: border-box;

                        transition: border 0.2s;

                        &:focus {
                          border-top: 2px solid #00bdee;
                          border-bottom: 2px solid #00bdee;
                        }

                        &::-webkit-scrollbar {
                          width: 8px;
                        }

                        &::-webkit-scrollbar-thumb {
                          border-radius: 4px;
                          background-color: #444;
                        }

                        &::-webkit-scrollbar-track {
                          background-color: transparent;
                        }
                      }
                    }
                  }

                  div.sweetImg {
                    margin-bottom: 16px;

                    position: relative;

                    img {
                      background-color: white;
                    }

                    button {
                      outline: none;
                      border: none;
                      background: none;

                      padding: 0;

                      position: absolute;
                      top: 0;
                      right: 0;

                      cursor: pointer;

                      svg {
                        color: white;

                        width: 24px;
                        height: 24px;

                        transition: color 0.2s;
                      }

                      &:hover > svg {
                        color: #ff6633;
                      }
                    }
                  }

                  label[for="sweetUpdatefileBtn"] {
                    color: #00acee;
                    font-weight: normal;

                    margin-bottom: 8px;

                    cursor: pointer;

                    transition: color 0.2s;

                    &:hover {
                      color: #00bdee;
                    }

                    svg {
                      margin-left: 8px;
                    }

                    input[type="file"] {
                      display: none;
                    }
                  }
                }
              `
            : css`
                div.nameAndBtn {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  width: 100%;
                  height: 37px;

                  margin-bottom: 8px;
                  padding: 0 8px;
                  border-bottom: 2px solid #444;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
                  box-sizing: border-box;

                  span {
                    padding-left: 4px;
                  }

                  div.btnWrap {
                    button {
                      background: none;
                      border: none;
                      outline: none;
                      color: #444;

                      transition: color 0.2s;

                      cursor: pointer;

                      &.deleteBtn:hover {
                        color: #ff6633;
                      }
                      &.editBtn:hover {
                        color: #00bdee;
                      }
                    }
                  }
                }

                p {
                  display: flex;

                  font-weight: normal;

                  width: 100%;
                  /* height: ${({ textareaSize }) =>
                    textareaSize <= 60 ? 60 : textareaSize}px; */

                  margin: 24px 0;
                  padding: 2px 12px;
                  /* padding: 0 12px;

                  border-top: 2px solid #444;
                  border-bottom: 2px solid #444; */

                  box-sizing: border-box;

                  white-space: pre-line;
                  line-height: 24px;

                  flex: auto;
                  flex-wrap: wrap;
                }

                div.sweetImg {
                  margin-bottom: 16px;

                  img {
                    background-color: white;

                    border-top: 2px solid #444;
                    border-bottom: 2px solid #444;
                    box-sizing: border-box;

                    transition: border-color 0.2s;

                    cursor: pointer;

                    &:hover {
                      border-top: 2px solid #00bdee;
                      border-bottom: 2px solid #00bdee;
                    }
                  }
                }
              `}
      }
    }
  }

  div.closeUpImgContainer {
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
  }
`;

export default SweetStyle;
