import styled from "styled-components";

const AuthFormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  margin-top: 28px;

  overflow: hidden;

  height: ${({ newAccount }) => (newAccount ? 262 : 132)}px;

  transition: height ease .3s;

  // 계정생성할 때 길어지는 데 이걸 애니메이션으로 길어지는 효과 구현하기(지금 height값이 없음) - AuthForm.js 하단 useEffect

  input:not(input[type="file"]) {
    width: 100%;
    min-height: 36px;
    background: white;
    outline: none;
    border: none;
    border-radius: 18px;

    padding: 0 12px;

    box-sizing: border-box;

    &[type="submit"] {
      background: #00acee;
      color: white;

      font-size: 1rem;
      font-weight: bold;

      cursor: pointer;
    }
  }

  label[for="fileBtn"] {
    div#profileImageInp {
      width: 70px;
      height: 70px;

      border-radius: 50%;

      position: relative;

      img,
      div {
        border-radius: 50%;
        border: 3px solid #00acee;

        box-sizing: border-box;

        overflow: hidden;
      }

      // image true
      img {
      }
      button {
        color: white;

        padding: 0;
        margin: 0;
        outline: none;
        border: none;
        background: none;

        position: absolute;
        top: -13px;
        right: -5px;
        /* bottom: -20px;
        left: 50%;
        transform: translateX(-50%); */

        cursor: pointer;

        svg {
          color: #444;
          width: 18px;
          height: 18px;

          transition: color 0.15s;
        }

        &:hover > svg {
          color: #ff6633;
        }
      }

      // image false
      div {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 100%;

        background-color: #222;

        svg {
          width: 25px;
          height: 25px;
          color: #00acee;
        }
      }

      cursor: pointer;
    }

    input[type="file"] {
      display: none;
    }
  }

  span#errorText {
    text-align: center;
    color: #ff6633;
  }
`;

const AuthFormSpanStyle = styled.span`
  color: #00acee;
  text-decoration-line: underline;

  margin: 12px 0;

  cursor: pointer;
`;

export { AuthFormStyle, AuthFormSpanStyle };