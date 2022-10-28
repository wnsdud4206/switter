import styled from "styled-components";

const NotificationStyle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  padding: 16px 0;

  &:not(:first-child) {
    border-top: 2px solid #444;
  }
  & > div {
    min-height: 50px;
  }

  div.noticeProfileImage {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    min-width: 50px;
    height: 50px;

    background-color: white;

    border-radius: 50%;
    border: 1px solid #00bdee;
    box-sizing: border-box;

    overflow: hidden;

    img {
      width: 50px;
      height: 50px;
    }

    svg {
      color: #00bdee;

      width: 38px;
      height: 38px;
    }
  }

  div.noticeTextWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;

    span {
    }
  }

  div.noticeBtnWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    
    min-width: 50px;

    outline: 1px solid white;

    button {
      background: none;
      outline: none;
      border: none;

      margin: 0;
      padding: 0;

      color: white;
      font-weight: bold;
      font-size: .9em;

      cursor: pointer;

      outline: 1px solid red;
    }
  }
`;

export default NotificationStyle;
