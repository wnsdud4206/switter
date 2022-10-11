import styled from "styled-components";

// 유튜브 댓글UI 참고

const CommentStyle = styled.div`
  display: flex;

  box-sizing: border-box;

  /* outline: 1px solid orange; */

  &:not(:last-child) {
    /* padding-bottom: 32px; */
    /* margin-bottom: 32px; */
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 2px solid #444;
  }

  div.commentUserImage {
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

  div.commentWrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding-top: 8px;
    padding-left: 8px;
    box-sizing: border-box;

    width: 100%;

    /* outline: 1px solid red; */

    div.commentHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      span.commentUserName {
        /* outline: 1px solid white; */
      }

      div.commentEditAndDelete {
        display: flex;
        align-items: center;

        /* outline: 1px solid white; */

        button {
          /* outline: 1px solid red; */
          outline: none;
          border: none;
          background: none;
          color: #444;

          transition: color 0.2s;

          cursor: pointer;

          &.commentEdit:hover {
            color: #00bdee;
          }
          &.commentDelete:hover {
            color: #ff6633;
          }
        }
      }
    }

    p.commentText {
      font-weight: normal;
      white-space: pre-line;
      line-height: 24px;
      text-align: left;

      width: 100%;

      /* outline: 1px solid white; */
    }

    button.commentLike {
    }
  }
`;

export default CommentStyle;
