import styled from "styled-components";

const NotificationListStyle = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;

  background-color: #222;

  width: 85%;

  margin: 0;
  padding: 0 8px;
  border-radius: 8px;
  border: 2px solid #444;
  box-sizing: border-box;

  position: absolute;
  left: 50%;

  transform: translateX(-50%);

  /* outline: 1px solid red; */

  li:not(:first-child) {
    border-top: 2px solid #444;
  }

  li {
    display: flex;
    /* display: none; */
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    padding: 16px 0;

    & > div {
      height: 50px;
    }

    div.noticeProfileImage {
      width: 50px;

      outline: 1px solid white;
    }
    div.noticeTextWrap {
      display: flex;
      flex-direction: column;
      justify-content: center;

      width: 100%;

      outline: 1px solid orange;

      span {
      }
    }
    div.noticeBtn {
      width: 50px;

      outline: 1px solid white;
    }
  }
`;

export default NotificationListStyle;