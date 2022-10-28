import styled from "styled-components";

const CommentContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-top: 8px;
  padding-left: 8px;
  box-sizing: border-box;

  width: calc(100% - 40px);

  div.commentHeader {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    width: 100%;
    height: 21px;

    span.commentUserName {
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

        svg {
          width: 14px;
          height: 14px;
        }
      }
    }
  }

  p.commentText {
    font-weight: normal;
    /* white-space: pre; */
    word-wrap: break-word;
    line-height: 24px;
    text-align: left;

    width: 100%;

    /* outline: 1px solid white; */
  }

  button.commentLike {
  }
`;

export default CommentContentStyle;
