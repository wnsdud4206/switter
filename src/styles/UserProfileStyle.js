import styled from "styled-components";

const UserProfileStyle = styled.div`
  display: flex;
  align-items: flex-start; // 내 소개가 길어질 수 있기 때문
  // 모바일에서는 column으로 보이게

  width: 100%;

  margin: 16px 0 0;
  padding: 20px 0;

  div#attachmentProfile {
    div#userAttachment {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 150px;
      margin: 0 7vw;

      img {
        border-radius: 50%;
      }
    }
  }

  div#textProfile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 310px; // 100%로 줄까?
    min-height: 150px;

    div#textProfileHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2#userName {
        font-weight: lighter;

        letter-spacing: 0.5px;

        margin: 0;
      }

      div#profileActions {
        display: flex;
        align-items: center;
        gap: 8px;

        button#followToggle {
          outline: 1px solid white;
          border: none;
          background: none;
          padding: 0;

          display: flex;
          align-items: center;

          width: 32px;
          height: 32px;

          color: var(--sub-color);

          cursor: pointer;

          svg {
            font-size: 22px;

            margin-left: 5px;

            outline: 1px solid red;

            &.followIcon {
              display: block;
              color: var(--icon-color);
            }
            &.unFollowIconHover {
              display: none;
              color: #ff6633;
            }
            &.unFollowIcon {
              display: block;
              color: var(--sub-color);
            }
            &.followIconHover {
              display: none;
              color: var(--icon-color);
            }
          }

          &:hover {
            svg {
              &.followIcon {
                display: none;
              }
              &.unFollowIconHover {
                display: block;
              }
              &.unFollowIcon {
                display: none;
              }
              &.followIconHover {
                display: block;
              }
            }
          }
        }

        nav#profileMenu {
          outline: 1px solid red;

          display: flex;

          position: relative;

          &:hover {
            ul {
              display: flex;
            }
          }

          button#profileMenuBtn {
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
          }

          ul {
            display: none;
            /* display: flex; */
            align-items: center;
            flex-direction: column;
            gap: 0;

            width: 120px;

            list-style: none;

            padding: 0;
            margin: 0;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
            border: 1px solid var(--border-color);

            position: absolute;
            left: 32px;

            li {
              width: 100%;

              button {
                border: none;
                outline: none;
                background: none;
                padding: 8px 0;

                color: var(--sub-color);

                width: 100%;

                opacity: 0.8;

                cursor: pointer;

                transition: opacity 0.2s color 0.2s;

                &:hover {
                  opacity: 1;

                  &#accountWithdrawalBtn {
                    color: #ff6633;
                  }
                }

                &.profileEditBtn {
                }

                &#logOutBtn {
                }

                &#accountWithdrawalBtn {
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

    ul {
      list-style: none;

      display: flex;
      gap: 40px;

      margin: 0;
      padding: 0;

      li {
      }
    }

    p {
    }
  }
`;

export default UserProfileStyle;
