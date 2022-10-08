import styled from "styled-components";

const SweetEditStyle = styled.form`
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
        /* height: ${({ textareaHeight }) => textareaHeight}px; */
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
`;

export default SweetEditStyle;