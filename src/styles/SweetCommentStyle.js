import styled from "styled-components";

const SweetCommentStyle = styled.div`
  width: 100%;

  padding: 16px 8px;
  box-sizing: border-box;

  /* outline: 2px solid red; */

  &.hide {
    display: none;
  }

  /* form은 임시, commentFactory라는 이름으로 모듈화 할 예정 */
  form {
    display: flex;

    /* outline: 1px solid white; */

    div.userImage {
      display: flex;
      align-items: flex-end;
      justify-content: center;

      min-width: 40px;
      height: 40px;

      background-color: white;

      border-radius: 50%;
      border: 1px solid #00bdee;
      box-sizing: border-box;

      overflow: hidden;

      img {
        width: 40px;
        height: 40px;
      }

      svg {
        color: #00bdee;

        width: 34px;
        height: 34px;
      }
    }

    input[type="text"] {
      background: none;
      outline: none;
      border: none;

      color: white;

      margin-left: 8px;
      border-bottom: 2px solid white;
      box-sizing: border-box;

      width: 100%;
    }

    label[for="commentSubmitBtn"] {
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: #00bdee;

      min-width: 40px;
      height: 40px;

      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      /* border-radius: 50%; */

      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;

        transition: transform .2s;
      }

      &:hover > svg {
        transform: rotateZ(90deg);
      }

      input[type="submit"] {
        display: none;
      }
    }
  }

  div#commentList {
  }
`;

export default SweetCommentStyle;
