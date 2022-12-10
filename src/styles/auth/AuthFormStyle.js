import styled from "styled-components";

const AuthFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  position: relative;

  div#authFormWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    width: 100%;

    margin-top: 28px;

    overflow: hidden;

    height: ${({ newAccount }) => (newAccount ? 262 : 132)}px;

    transition: height ease 0.3s;

    input:not(input[type="file"]) {
      width: 100%;
      min-height: 36px;
      background: white;
      outline: none;
      
      border-radius: 18px;
      border: 1px solid var(--border-color);
      box-sizing: border-box;

      padding: 0 12px;

      &[type="submit"] {
        border: none;
        background: var(--icon-color);
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
          /* border: 3px solid #9953e2; */
          border: 3px solid var(--icon-color);

          box-sizing: border-box;

          overflow: hidden;
        }

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

        div {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 100%;

          background-color: #222;

          svg {
            width: 25px;
            height: 25px;
            color: var(--icon-color);
          }
        }

        cursor: pointer;
      }

      input[type="file"] {
        display: none;
      }
    }
  }

  span#errorText {
    text-align: center;
    color: #ff6633;

    position: absolute;
    bottom: -28px;
  }
`;

const AuthFormSpanStyle = styled.span`
  color: var(--icon-color);
  text-decoration-line: underline;

  margin-top: 32px;

  cursor: pointer;
`;

export { AuthFormStyle, AuthFormSpanStyle };
