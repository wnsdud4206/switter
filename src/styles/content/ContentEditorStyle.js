import styled from "styled-components";

const ContentEditorStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;

  padding: 0 6px;
  box-sizing: border-box;
  
  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  div#contentEditBackground {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    // 스크롤 막는법?

    div#createBox {
      background-color: var(--background-color);
      width: 470px;
      /* width: 45vw; */
      /* 모바일에서 줄이기?? */

      padding: 16px 0;
      border-radius: 8px;
      border: 1px solid var(--border-color);

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;

        label[for="fileBtn"] {
          font-size: 1.2rem;
          padding: 6px;

          cursor: pointer;

          transition: background 0.2s;

          &:hover {
            background-color: rgba(128, 128, 128, 0.3);
          }

          svg {
          }

          input[type="file"] {
            display: none;
          }

          &.none {
            color: #ccc;

            pointer-events: none;
          }
        }

        div#selectImageWrap {
          display: flex;

          width: 100%;
          height: 104px;

          overflow-y: hidden;
          overflow-x: auto;

          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          box-sizing: border-box;

          &::-webkit-scrollbar {
            height: 8px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: var(--personal-color);
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }

          div.selectImage {
            position: relative;

            img {
              vertical-align: middle
            }

            button {
              background: none;
              border: none;
              outline: none;

              padding: 0;

              width: 16px;
              height: 16px;

              position: absolute;
              top: 0;
              right: 0;

              opacity: 0;

              transition: opacity 0.2s;

              outline: 1px solid red;

              cursor: pointer;

              svg {
                color: white;
                font-size: 16px;
              }
            }

            &:hover > button {
              opacity: 1;
            }
          }

          p {
            width: 100%;
            text-align: center;
          }
        }

        fieldset {
          display: flex;
          align-items: flex-end;

          width: 100%;

          border: none;
          margin: 0;
          box-sizing: border-box;

          input[type="text"] {
            background: none;
            outline: none;
            border: none;

            color: var(--sub-color);
            font-size: 1.1rem;

            width: 100%;
            border-bottom: 2px solid var(--sub-color);
            box-sizing: border-box;
            padding-bottom: 4px;
            padding-left: 12px;

            &:focus + label[for="submitBtn"] {
              svg {
                display: none;
              }
              div#texting {
                display: flex;
              }

              &:hover {
                svg {
                  display: block;
                  transform: rotateZ(90deg);
                  transition: transform 0.2s;
                }
                div#texting {
                  display: none;
                }
              }
            }
          }

          label[for="submitBtn"] {
            display: flex;
            align-items: center;
            justify-content: center;

            min-width: 36px;
            height: 36px;

            border-top-left-radius: 50%;
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            border: 2px solid var(--icon-color);
            box-sizing: border-box;

            cursor: pointer;

            &:hover > svg {
              transform: rotateZ(90deg);
            }

            svg {
              color: var(--icon-color);

              width: 20px;
              height: 20px;

              transition: transform 0.2s;
            }

            div#texting {
              display: none;
              align-items: center;
              gap: 3px;

              div.textingCircle {
                width: 5px;
                height: 5px;
                background-color: var(--icon-color);
                border-radius: 50%;

                &.textingCircle1 {
                  animation: jump 1.2s 0.5s infinite alternate;
                }
                &.textingCircle2 {
                  animation: jump 1.2s 0.6s infinite alternate;
                }
                &.textingCircle3 {
                  animation: jump 1.2s 0.7s infinite alternate;
                }

                @keyframes jump {
                  0% {
                    transform: translateY(-3px);
                  }
                  20% {
                    transform: translate(0);
                  }
                  100% {
                    transform: translateY(0);
                  }
                }
              }
            }

            input[type="submit"] {
              display: none;
            }
          }
        }
      }
    }
  }
`;

export default ContentEditorStyle;