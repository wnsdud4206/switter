import styled from "styled-components";

const ContentStyle = styled.div`
  width: 100%;

  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-sizing: border-box;

  div.contentHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px;

    a.creatorWrap {
      display: flex;
      align-items: center;

      text-decoration: none;

      div.creatorAttachment {
        display: flex;
        align-items: flex-end;
        justify-content: center;

        width: 40px;
        height: 40px;

        background-color: white;

        border-radius: 50%;
        overflow: hidden;

        img {
          vertical-align: middle;
        }

        svg.creatorAttachmentIcon {
          font-size: 32px;
          color: var(--icon-color);
        }
      }

      span.creatorName {
        margin-left: 8px;

        color: var(--sub-color);
      }
    }

    div.headerBtnWrap {
      display: flex;
      gap: 8px;

      button {
        outline: none;
        background: none;
        border: none;
        padding: 0;

        cursor: pointer;

        svg {
          color: var(--icon-color);

          width: 20px;
          height: 20px;
        }

        &.editBtn {
          svg {
          }
        }
        &.removeBtn {
          svg {
            padding-top: 2px;
          }
        }
      }
    }
  }

  // ContentBox.js에서도 쓰니까 묶어놔도 좋을 듯
  div.contentImagesWrap {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);

    position: relative;

    overflow: hidden;

    div.contentImages {
      display: flex;
      align-items: center;

      div.contentImage {

        img {
          vertical-align: middle;
        }
      }
    }
    button {
      outline: none;
      background: none;
      border: none;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #aaa;

      width: 28px;
      height: 28px;

      padding: 0;
      border-radius: 50%;
      box-sizing: border-box;

      position: absolute;
      top: 50%;

      transform: translateY(-100%);

      opacity: 0;

      transition: all 0.2s;

      cursor: pointer;

      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }

      svg {
        font-size: 16px;

        pointer-events: none;
      }
    }

    &:hover button {
      opacity: 0.7;

      &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  div.contentText {
    padding: 8px;

    cursor: pointer;

    p {
    }
  }

  div.contentActions {
  }

  div.contentComments {
    padding: 8px;
    border-top: 1px solid var(--border-color);
  }
`;

export default ContentStyle;