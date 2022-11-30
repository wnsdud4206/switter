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

    div {
      display: flex;
      justify-content: center;
      align-items: flex-end;

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

const SideMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* flex-basis: 290px; */
  width: 290px;

  margin-top: 32px;
  padding: 0 8px;
  box-sizing: border-box;

  div#sideMenuHeader {
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

      margin: 0 0 8px 0;
    }

    li {
      ${userStyle}

      a {
        div {
        }

        span {
        }
      }
    }

    &#followList {
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

  @media (max-width: 850px) {
    display: none;
  }
`;

export default SideMenuStyle;
