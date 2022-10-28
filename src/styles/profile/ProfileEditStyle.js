import styled from "styled-components";

const ProfileEditStyle = styled.form`
  /* outline: 1px solid white; */

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 8px 0 16px;
  padding: 16px 0;

  fieldset {
    display: flex;

    width: 100%;
    height: 52px;

    margin: 0;
    margin-bottom: 24px;
    padding: 0;

    border: 1px solid #00acee;
    box-sizing: border-box;
    border-radius: 26px;

    transition: border 0.25s;

    &:hover {
      border-color: #00bdee;
    }

    input {
      box-sizing: border-box;

      height: 50px;

      outline: none;
    }

    input[type="text"] {
      background: transparent;

      color: white;

      padding: 0 22px;

      border: none;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;

      flex: auto;
    }

    label[for="submitBtn"] {
      width: 50px;

      background: #00acee;

      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      border-radius: 50%;

      cursor: pointer;

      transition: background 0.25s;

      &:hover {
        background: #00bdee;
      }

      &:active {
        background: #009bee;
      }

      svg {
        width: 20px;
        height: 20px;
      }

      input[type="submit"] {
        display: none;
      }
    }
  }

  label[for="fileBtn"] {
    color: #00acee;
    font-weight: normal;

    margin-bottom: 8px;

    cursor: pointer;

    transition: color 0.25s;

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

  /* Add photo +가 애니메이션으로 cancel photo -로 바뀌게, 이미지 하단 x버튼 제거하고 */
  div#selectImage {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 50%;
    }

    button {
      outline: none;
      border: none;
      background: transparent;

      color: #444;

      width: 24px;
      height: 24px;

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
`;


export default ProfileEditStyle;
