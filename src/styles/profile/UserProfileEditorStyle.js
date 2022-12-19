import styled from "styled-components";

const UserProfileEditorStyle = styled.form`
  display: flex;
  align-items: flex-start; // 내 소개가 길어질 수 있기 때문
  // 모바일에서는 column으로 보이게

  width: 100%;

  padding: 32px 0;

  div#profileEditWrap {
    display: flex;

    div#attachmentProfile {
      div#selectImage {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 0 7vw;

        position: relative;

        label[for="fileBtn"] {
          display: flex;
          align-items: flex-end;
          justify-content: center;

          color: var(--sub-color);
          font-weight: normal;
          font-size: 1.1rem;

          min-width: 150px;
          height: 150px;

          background-color: white;

          border-radius: 50%;
          border: 2px solid var(--icon-color);
          box-sizing: border-box;

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

          svg.profileAttachmenticon {
            font-size: 128px;

            color: var(--icon-color);
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
      gap: 8px;

      input[type="text"] {
        outline: none;
        border: none;
        background: transparent;

        font-size: 1.5rem;
        font-weight: lighter;
        letter-spacing: 0.5px;
        color: var(--sub-color);

        border-bottom: 1px solid var(--border-color);
        box-sizing: border-box;

        opacity: 0.8;

        &:focus {
          opacity: 1;
        }
      }

      textarea.introduce {
        outline: none;
        background: none;

        background-color: transparent;
        font-size: 1rem;

        color: var(--sub-color);

        height: 100%;

        padding: 6px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        box-sizing: border-box;

        resize: none;
      }

      div#profileEditActionWrap {
        display: flex;
        gap: 8px;

        align-self: flex-end;

        button.profileEditBtn {
          border: none;
          outline: none;
          background: none;
          padding: 2px 6px;

          font-size: 1rem;

          color: var(--sub-color);

          border: 1px solid var(--border-color);
          border-radius: 4px;
          box-sizing: border-box;

          transition: background-color 0.2s;

          cursor: pointer;

          svg {
            color: var(--icon-color);
          }

          &:hover {
            background-color: rgba(128, 128, 128, 0.2);
          }
        }

        label[for="submitBtn"] {
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 1rem;

          padding: 2px 6px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          box-sizing: border-box;

          cursor: pointer;

          transition: background-color 0.2s;

          svg {
            color: var(--icon-color);
          }

          input[type="submit"] {
            display: none;
          }

          &:hover {
            background-color: rgba(128, 128, 128, 0.2);
          }
        }

        svg {
          font-size: 24px;
        }
      }
    }
  }

  @media (max-width: 850px) {
    padding: 16px 0;

    div#profileEditWrap {
      flex-direction: column;
      gap: 16px;

      width: 100%;

      div#textProfile {
        gap: 16px;
      }
    }
  }
`;

export default UserProfileEditorStyle;
