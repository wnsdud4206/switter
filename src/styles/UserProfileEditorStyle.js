import styled from "styled-components";

const UserProfileEditorStyle = styled.form`
  display: flex;
  align-items: flex-start;  // 내 소개가 길어질 수 있기 때문
  // 모바일에서는 column으로 보이게

  width: 100%;

  margin: 24px 0 0;

  outline: 1px solid red;

  div#attachmentProfile {
    outline: 1px solid white;
    
    /* Add photo +가 애니메이션으로 cancel photo -로 바뀌게, 이미지 하단 x버튼 제거하고 */
    div#selectImage {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        border-radius: 50%;
        margin: 0 7vw;
      }

      button {
        outline: none;
        border: none;
        background: transparent;

        color: rgba(128, 128, 128, 0.5);

        width: 20px;
        height: 20px;

        padding: 0;

        box-sizing: border-box;
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

    label[for="fileBtn"] {
      color: var(--sub-color);
      font-weight: normal;
      font-size: 1.1rem;

      margin-bottom: 8px;
      padding: 6px;
      border-radius: 4px;

      cursor: pointer;

      transition: background 0.2s;

      &:hover {
        background-color: rgba(128, 128, 128, 0.2);
      }

      svg {
        margin-left: 8px;
      }

      input[type="file"] {
        display: none;
      }
    }
  }

  div#textProfile {
    outline: 1px solid orange;
    
    fieldset {
      display: flex;

      width: 100%;
      height: 52px;

      margin: 0;
      margin-bottom: 24px;
      padding: 0;

      border: 1px solid var(--icon-color);
      box-sizing: border-box;
      border-radius: 26px;

      input {
        box-sizing: border-box;

        height: 50px;

        outline: none;
      }

      input[type="text"] {
        background: transparent;

        color: var(--sub-color);

        padding: 0 22px;

        border: none;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;

        flex: auto;
      }

      label[for="submitBtn"] {
        width: 50px;

        /* background: #00acee; */

        display: flex;
        align-items: center;
        justify-content: center;

        border: 2px solid var(--icon-color);
        border-radius: 50%;
        box-sizing: border-box;

        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;

          color: var(--icon-color);
        }

        input[type="submit"] {
          display: none;
        }
      }
    }
  }
`;

export default UserProfileEditorStyle;
