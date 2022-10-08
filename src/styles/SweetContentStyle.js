import styled from "styled-components";

const SweetContentStyle = styled.div`
  width: 100%;

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

    margin: 32px 0 24px;
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
`;

export default SweetContentStyle;
