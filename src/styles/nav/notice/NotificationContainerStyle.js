import styled from "styled-components";

// 하나 더 감쌓야할듯

const NotificationContainerStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 85%;

  position: absolute;
  left: 50%;

  transform: translate(-50%, 10px);

  /* outline: 1px solid red; */

  &.open {
    visibility: visible;
  }

  &.close {
    visibility: hidden;
    transition: visibility 0.21s;
  }

  &:before {
    content: "";
    /* width: 30px;
    height: 20px; */

    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 12px solid #444;

    position: absolute;
    top: -10px;
    left: 50%;

    transform: translateX(-50%);
  }

  div#noticeDropdownWrap {
    background-color: #222;

    width: 100%;

    border-radius: 8px;
    border: 2px solid #444;
    box-sizing: border-box;

    max-height: 60vh;

    position: relative;

    overflow-y: scroll;

    div#noticeHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;

      background: #222;

      width: 100%;

      padding: 4px 8px;
      border-bottom: 2px solid #444;
      box-sizing: border-box;

      position: sticky;
      top: 0;

      button {
        background: none;
        outline: none;
        border: none;

        color: white;   // 임시

        cursor: pointer;
      }

      div#categoryTab {
        button {
        }
        button#sweetNotice {
        }
        button#commentNotice {
        }
      }
      dib#noticeAction {
        button {
        }
        button#allConfirm {
        }
        button#allDelete {
        }
      }
    }

    div#noticeDropdown {
      display: flex;
      align-items: flex-end;

      width: 100%;
      height: 0;

      transition: height 0.2s ease-out;

      overflow: hidden;

      /* outline: 1px solid orange; */

      &.dropdown {
        height: ${({ ulSize }) => ulSize}px;
      }
      &.deopup {
        height: 0;
      }

      ul#notificationList {
        list-style: none;

        display: flex;
        flex-direction: column;

        width: 100%;
        /* max-height: 80vh; */

        margin: 0;
        padding: 0 8px;
        box-sizing: border-box;

        /* outline: 1px solid red; */

        li {
        }
      }

      p#noNotice {
        display: flex;
        justify-content: center;

        width: 100%;

        padding: 16px 0;
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      /* background-color: #00bdee; */
      background-color: #444;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;

export default NotificationContainerStyle;
