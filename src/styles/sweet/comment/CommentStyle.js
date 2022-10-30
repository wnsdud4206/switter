import styled from "styled-components";

// 유튜브 댓글UI 참고

const CommentStyle = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 100%;

  box-sizing: border-box;

  &:first-child {
    margin-top: 36px;
  }

  &:not(:last-child) {
    /* padding-bottom: 32px; */
    /* margin-bottom: 32px; */
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 2px solid #444;
  }

  a {
    text-decoration: none;
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

  /* div.comentEditWrap {
  }

  div.commentWrap {
  } */
`;

export default CommentStyle;
