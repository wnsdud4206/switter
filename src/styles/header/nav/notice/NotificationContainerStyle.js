import styled from "styled-components";

// 하나 더 감쌓야할듯

const NotificationContainerStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  min-width: 470px;

  // 모바일은 center
  position: absolute;
  right: 10px;

  transform: translateY(18px);

  &.open {
    visibility: visible;
  }

  &.close {
    visibility: hidden;
    transition: visibility 0.21s;
  }

  &:before {
    content: "";

    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 12px solid var(--border-color);

    position: absolute;
    top: -10px;
    right: 52px;

    transform: translateX(-50%);
  }

  div#noticeDropdownWrap {
    background-color: var(--background-color);

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

      /* background: var(--background-color); */

      width: 100%;

      padding: 4px 8px;
      border-bottom: 2px solid var(--border-color);
      box-sizing: border-box;

      position: sticky;
      top: 0;

      div > button {
        background: none;
        outline: none;
        border: none;

        color: var(--sub-color); // 임시

        cursor: pointer;

        transition: background-color 0.2s;

        &:hover {
          background-color: rgba(128, 128, 128, 0.2);
        }

        &.active {
          background-color: rgba(128, 128, 128, 0.3);
        }
      }

      div#categoryTab {
        display: flex;
        gap: 8px;

        button {
          &#newNotice {
          }
          &#confirmNotice {
          }
        }
      }
      div#noticeAction {
        button {
          &#allConfirm {
          }
          &#allDelete {
          }
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
      background-color: var(--icon-color);
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;

export default NotificationContainerStyle;
