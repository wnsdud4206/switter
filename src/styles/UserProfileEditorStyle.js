import styled from "styled-components";

const UserProfileEditorStyle = styled.form`
  display: flex;
  align-items: flex-start; // 내 소개가 길어질 수 있기 때문
  // 모바일에서는 column으로 보이게

  width: 100%;

  margin: 16px 0 0;
  padding: 20px 0;

  outline: 1px solid red;

  div#profileEditBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    div#profileEditWrap {
      display: flex;

      div#attachmentProfile {
        outline: 1px solid white;

        /* Add photo +가 애니메이션으로 cancel photo -로 바뀌게, 이미지 하단 x버튼 제거하고 */
        div#selectImage {
          display: flex;
          flex-direction: column;
          align-items: center;

          margin: 0 7vw;

          position: relative;

          outline: 1px solid white;

          label[for="fileBtn"] {
            color: var(--sub-color);
            font-weight: normal;
            font-size: 1.1rem;

            border-radius: 50%;

            position: relative;

            overflow: hidden;

            cursor: pointer;

            &:hover {
              div.changeIconWrap {
                opacity: 0.5;
              }
            }

            img {
              vertical-align: middle;
            }

            div.changeIconWrap {
              display: flex;
              justify-content: center;
              align-items: center;

              background-color: black;

              width: 100%;
              height: 100%;

              border-radius: 50%;

              position: absolute;
              top: 0;
              left: 0;

              opacity: 0;

              transition: opacity 0.2s;

              outline: 1px solid red;

              svg {
                color: var(--sub-color);
                font-size: 42px;
              }
            }

            input[type="file"] {
              display: none;
            }
          }

          button#attachmentRemoveBtn {
            outline: none;
            border: none;
            background: transparent;

            color: rgba(128, 128, 128, 0.4);

            width: 20px;
            height: 20px;

            padding: 0;
            box-sizing: border-box;

            position: absolute;
            top: 4px;
            right: 4px;

            cursor: pointer;

            transition: color 0.25s;

            &:hover {
              color: #ff6633;
            }

            svg {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      div#textProfile {
        display: flex;
        flex-direction: column;

        outline: 1px solid white;

        input[type="text"] {
          outline: none;
          border: none;
          background: transparent;

          font-size: 1.5rem;
          font-weight: lighter;
          letter-spacing: 0.5px;
          color: var(--sub-color);

          opacity: .8;

          &:focus {
            opacity: 1;
          }
        }

        textarea#introduce {
          background-color: transparent;
          font-size: 1rem;

          color: var(--sub-color);
        }
      }
    }

    div#profileEditActionWrap {
      display: flex;
      gap: 8px;

      button.profileEditBtn {
        border: none;
        outline: none;
        background: none;
        padding: 2px 6px;

        font-size: 1rem;

        color: var(--sub-color);

        border: 2px solid white;
        border-radius: 4px;
        box-sizing: border-box;

        cursor: pointer;

        svg {
          color: var(--icon-color);
        }
      }

      label[for="submitBtn"] {
        /* background: #00acee; */

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1rem;

        padding: 2px 6px;
        border: 2px solid white;
        border-radius: 4px;
        box-sizing: border-box;

        cursor: pointer;

        svg {
          color: var(--icon-color);
        }

        input[type="submit"] {
          display: none;
        }
      }

      svg {
        font-size: 24px;
      }
    }
  }
`;

export default UserProfileEditorStyle;
