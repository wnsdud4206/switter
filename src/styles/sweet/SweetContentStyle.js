import styled from "styled-components";

const SweetContentStyle = styled.div`
  width: 100%;

  div.sweetHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    /* height: 37px; */
    height: 50px;

    padding: 0 8px;
    border-bottom: 2px solid #444;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-sizing: border-box;

    div.userWrap {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;

        text-decoration: none;
        color: white;
      }

      div.sweetUserImage {
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

      span {
        padding-left: 8px;
      }
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

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  div.sweetText {
    height: 100%;

    padding: 40px 0 24px;
    cursor: pointer;

    p {
      /* display: flex; */

      font-weight: normal;

      width: 100%;
      /* height: ${({ textareaSize }) =>
        textareaSize <= 60 ? 60 : textareaSize}px; */

      margin: 0;
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
