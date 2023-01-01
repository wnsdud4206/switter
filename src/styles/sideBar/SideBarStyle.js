import styled, { css } from "styled-components";

const userStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  padding: 4px;
  box-sizing: border-box;

  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
  }

  a {
    display: flex;
    align-items: center;

    text-decoration: none;

    width: 100%;

    div {
      display: flex;
      align-items: flex-end;
      justify-content: center;

      background-color: white;

      border-radius: 50%;
      overflow: hidden;

      width: 40px;
      height: 40px;

      img {
        vertical-align: middle;
      }

      svg {
        color: var(--icon-color);
        font-size: 32px;
      }
    }

    span {
      color: var(--sub-color);

      margin-left: 8px;
    }
  }
`;

// 모바일에서 스크롤 생기게
const SideBarStyle = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 63px;

  div#sideBarContainer {
    display: flex;
    flex-direction: column;
    gap: 24px;

    /* flex-basis: 290px; */
    width: 290px;

    background-color: var(--background-color);

    margin-top: 32px;
    padding: 0 8px;
    box-sizing: border-box;

    transition: background-color 0.2s;

    div#sideBarHeader {
      ${userStyle}

      a.currentUserLink {
        div.currentUserAttachment {
          img {
          }
          svg.currentUserAttachmentIcon {
          }
        }
        span.currentUserName {
        }
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 6px;

      list-style: none;

      margin: 0;
      padding: 0;

      h4 {
        color: var(--sub-color);

        font-size: 0.9rem;
      }

      li {
        ${userStyle}

        a {
          div {
          }

          span {
          }
        }

        &#emptyFollowList {
          color: var(--sub-color);
        }
      }

      &#followList {
        div#listHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin: 0 0 4px 0;

          h4 {
            margin: 0;
          }

          button#userTypeToggleBtn {
            outline: none;
            border: none;
            padding: 4px;

            background-color: rgba(128, 128, 128, 0.2);
            color: var(--sub-color);

            border-radius: 4px;

            transition: background-color 0.2s;

            cursor: pointer;

            &:hover {
              background-color: rgba(128, 128, 128, 0.3);
            }
          }
        }

        li.followUser {
          a.followUserLink {
            div.followUserAttachment {
              img {
              }

              svg {
              }
            }
            span.followUserName {
            }
          }
        }
      }
      &#randomList {
        h4 {
          margin: 0 0 8px 0;
        }
        li.randomUser {
          a.randomUserLink {
            div.randomUserAttachment {
              img {
              }

              svg {
              }
            }
            span.randomUserName {
            }
          }
        }
      }
    }

    footer {
      color: rgba(128, 128, 128, 0.8);
    }
  }

  button#sideBarToggle {
    display: none;
  }

  // 모바일일 때 display: none 말고 transform: translateX로?

  // 임시
  @media (max-width: 850px) {
    display: flex;
    justify-content: flex-end;

    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    right: 0;

    overflow-y: scroll;

    transition: transform 0.2s, background-color 0.2s;

    &.hide {
      transform: translateX(100%);
    }
    &.show {
      transform: translateX(0);

      background-color: rgba(0, 0, 0, 0.3);
    }

    div#sideBarContainer {
      /* margin-top: */
      margin: 0;
      padding-top: 70px;
      border-left: 1px solid var(--border-color);
      box-sizing: border-box;

      position: absolute;
    }

    /* display: flex;
    justify-content: flex-end;

    background-color: rgba(0, 0, 0, 0.3);

    width: 100vw;

    position: fixed;
    top: 0;
    right: 0;

    outline: 1px solid red;

    div#sideBarContainer {
      background-color: var(--background-color);

      margin: 0;
      padding-top: 70px;
    }

    button#sideBarToggle {
      background-color: var(--icon-color);
      outline: none;
      border: none;

      display: block;

      padding: 12px;
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;

      position: fixed;
      right: 0;
      bottom: 5vh;

      transform: translateX(6px);

      transition: transform 0.2s;

      cursor: pointer;

      svg {
        font-size: 18px;
        color: var(--sub-color);

        pointer-events: none;
      }

      &:hover {
        transform: translateX(0);
      }
    } */
  }
`;

export default SideBarStyle;
