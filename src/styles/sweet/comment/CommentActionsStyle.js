import styled from "styled-components";

const CommentActionsStyle = styled.div`
  display: flex;
  align-items: center;

  button.commentLikeToggle {
    outline: none;
    border: none;
    background: none;

    cursor: pointer;

    svg {
      font-size: 16px;

      &.commentLike {
        color: #ff6633;
      }

      &.commentNotLike {
        color: white;
      }
    }
  }

  span.commentLikeCounter {
    font-size: 15px;
  }
`;

export default CommentActionsStyle;
