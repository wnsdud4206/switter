import styled from "styled-components";

const ContentBoxStyle = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  div#contentBackground {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    div#content {
      display: flex;
      flex-direction: row;

      // 임시, mobile에서는 다르게
      max-width: 87vw;
      height: 460px;

      border: 1px solid var(--border-color);
      border-radius: 8px;

      overflow: hidden;

      & > div {
        height: 100%;
      }

      div#contentBoxImagesWrap {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;

        background-color: var(--background-color);

        position: relative;

        border-right: 1px solid var(--border-color);

        div#contentBoxImages {
          div#contentBoxImage {
            display: flex;
            justify-content: center;
            align-items: center;

            background-color: var(--background-color);

            img {
              width: 100%;
              height: 460px;
              object-fit: contain;
            }
          }
        }

        & > button {
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

          &:active {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.1);
          }
        }

        &:hover button {
          opacity: 0.7;
        }

        div#noImage {
          // 그냥 없애고 사이즈를 줄일까?

          display: flex;
          justify-content: center;
          align-items: center;

          p {
          }
        }
      }

      div#CommentBox {
        display: flex;
        flex-direction: column;

        background-color: var(--background-color);

        min-width: 405px;

        div#contentBoxHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;

          height: 42px;

          padding: 8px;
          border-bottom: 1px solid var(--border-color);

          div#contentCreator {
            display: flex;
            align-items: center;

            a.creatorLink {
              display: flex;
              align-items: center;

              text-decoration: none;

              div#contentBoxCreatorAttachment {
                display: flex;
                align-items: flex-end;
                justify-content: center;

                width: 40px;
                height: 40px;

                background-color: white;

                border-radius: 50%;
                overflow: hidden;

                pointer-events: none;

                img {
                  pointer-events: none;
                }

                svg {
                  color: var(--icon-color);
                  font-size: 32px;

                  pointer-events: none;
                }
              }

              span#contentBoxCreatorName {
                margin-left: 8px;
                color: var(--sub-color);

                pointer-events: none;
              }
            }
          }

          div.likeWrap {
            display: flex;
            align-items: center;

            span {
              margin: 0 8px;
              font-size: 1.2rem;
            }

            button.likeBtn {
              background: none;
              outline: none;
              border: none;
              padding: 0;

              cursor: pointer;

              svg {
                font-size: 22px;
                &.userLike {
                  color: #ff6633;
                }
                &.userNotLike {
                  color: var(--sub-color);
                }
              }
            }
          }
        }

        div#commentsWrap {
          flex: 1;

          max-height: 340px;

          overflow-y: auto;

          &::-webkit-scrollbar {
            width: 8px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: var(--icon-color);
            /* background-color: #444; */
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }

          ul#commentsList {
            list-style: none;

            display: flex;
            flex-direction: column;
            gap: 8px;

            padding: 0 8px;
            box-sizing: border-box;

            li {
              display: flex;
              justify-content: space-between;

              &#creatorText {
                font-size: 1.1em;
                /* padding-left: 8px; */
                padding: 0 0 12px 8px;
                margin-bottom: 12px;
                border-bottom: 1px solid var(--border-color);
              }

              &#emptyComment {
                text-align: center;
                padding: 32px 0;
              }

              div.comment {
                display: flex;
                align-items: center;

                a.commentLink {
                  display: flex;
                  align-items: center;

                  text-decoration: none;
                  color: var(--sub-color);

                  div.commentUserImage {
                    display: flex;
                    justify-content: center;

                    background-color: white;

                    width: 40px;
                    height: 40px;

                    border-radius: 50%;

                    overflow: hidden;

                    pointer-events: none;

                    img {
                      pointer-events: none;
                    }

                    svg {
                      font-size: 32px;
                      color: var(--icon-color);
                      pointer-events: none;
                    }
                  }
                  span.commentUserName {
                    margin-left: 8px;

                    pointer-events: none;
                    b {
                    }
                  }
                }
                span.commentUserText {
                }
              }
            }
          }
        }

        div#commentFactory {
          background-color: var(--background-color);

          padding: 12px 8px;
          border-top: 1px solid var(--border-color);

          form {
            display: flex;

            div#userImage {
              display: flex;
              align-items: flex-end;
              justify-content: center;

              min-width: 36px;
              height: 36px;

              border-radius: 50%;
              box-sizing: border-box;

              overflow: hidden;

              img {
                width: 36px;
                height: 36px;
              }

              svg {
                color: var(--icon-color);

                width: 30px;
                height: 30px;
              }
            }

            input[type="text"] {
              background: none;
              outline: none;
              border: none;

              color: var(--sub-color);

              width: 100%;

              margin-left: 8px;
              border-bottom: 2px solid var(--sub-color);
              box-sizing: border-box;

              &:focus + label[for="commentSubmitBtn"] {
                svg {
                  display: none;
                }
                div#texting {
                  display: flex;
                }

                &:hover {
                  svg {
                    display: block;
                    transform: rotateZ(90deg);
                    transition: transform 0.2s;
                  }
                  div#texting {
                    display: none;
                  }
                }
              }
            }

            label[for="commentSubmitBtn"] {
              display: flex;
              align-items: center;
              justify-content: center;

              min-width: 36px;
              height: 36px;

              border-top-left-radius: 50%;
              border-top-right-radius: 50%;
              border-bottom-right-radius: 50%;
              border: 2px solid var(--icon-color);
              box-sizing: border-box;

              cursor: pointer;

              &:hover > svg {
                transform: rotateZ(90deg);
              }

              svg {
                color: var(--icon-color);

                width: 20px;
                height: 20px;

                transition: transform 0.2s;
              }

              div#texting {
                display: none;
                align-items: center;
                gap: 3px;

                div.textingCircle {
                  width: 5px;
                  height: 5px;
                  background-color: var(--icon-color);
                  border-radius: 50%;

                  &.textingCircle1 {
                    animation: jump 1.2s 0.5s infinite alternate;
                  }
                  &.textingCircle2 {
                    animation: jump 1.2s 0.6s infinite alternate;
                  }
                  &.textingCircle3 {
                    animation: jump 1.2s 0.7s infinite alternate;
                  }

                  @keyframes jump {
                    0% {
                      transform: translateY(-3px);
                    }
                    20% {
                      transform: translate(0);
                    }
                    100% {
                      transform: translateY(0);
                    }
                  }
                }
              }

              input[type="submit"] {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 850px) {
    /* X버튼? */
    div#contentBackground {
      div#content {
        flex-direction: column;
        justify-content: space-between;

        min-width: 95vw;
        height: auto;

        div#contentBoxImagesWrap {
          div#contentBoxImages {
            div#contentBoxImage {
              img {
                /* height: 200px; */
                height: 30vh;
              }
            }
          }
        }

        div#CommentBox {
          min-width: 100%;
          /* height: 330px; */
          height: 52vh;

          div#commentsWrap {
            ul#commentsList {
              li {
                div.comment {
                  flex-direction: column;
                  align-items: flex-start;

                  a.commentLink {
                    div.commentUserImage {
                      width: 32px;
                      height: 32px;
                    }

                    svg {
                      font-size: 24px;
                    }
                  }
                  span.commentUserName {
                  }
                }
                span.commentUserText {
                  margin-left: 8px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ContentBoxStyle;
