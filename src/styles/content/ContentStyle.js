import styled from "styled-components";

const ContentStyle = styled.div`
  /* width: 100%; */
  width: 470px;

  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 500px) {
    width: 100%;
  }

  div.contentHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px;

    div.contentMenuBox {
      display: flex;
      align-items: center;
      gap: 8px;

      nav.contentMenu {
        display: flex;

        position: relative;

        /* &:hover {
          ul {
            display: flex;
          }
        } */

        /* button.contentMenuBtn {
          outline: none;
          border: none;
          background: none;
          padding: 0;

          width: 32px;
          height: 32px;

          cursor: pointer;

          svg {
            color: var(--icon-color);
            font-size: 24px;
          }
        } */

        ul {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 0;

          list-style: none;

          background-color: var(--background-color);

          width: 120px;

          padding: 0;
          margin: 0;
          border-top-left-radius: 6px;
          border-bottom-right-radius: 6px;
          border-bottom-left-radius: 6px;
          border: 1px solid var(--border-color);

          position: absolute;
          top: 32px;
          right: 0;

          z-index: 1;

          overflow: hidden;

          li {
            width: 100%;

            overflow: hidden;

            button {
              border: none;
              outline: none;
              background: none;
              padding: 8px 0;

              color: var(--sub-color);

              width: 100%;

              opacity: 0.8;

              cursor: pointer;

              transition: opacity 0.2s color 0.2s background-color 0.2s;

              &:hover {
                opacity: 1;

                background-color: rgba(128, 128, 128, 0.2);

                &#accountWithdrawalBtn {
                  color: #ff6633;
                }
              }

              &.contentEditBtn {
              }

              &.contentDeleteBtn {
              }
            }

            &:not(:first-child) {
              border-top: 1px solid var(--border-color);
            }
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

      @media (max-width: 500px) {
        opacity: 0.7;

        &#accountWithdrawalBtn {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

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
