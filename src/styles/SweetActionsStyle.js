import styled from "styled-components";

const SweetActionsStyle = styled.div`
  display: flex;
  /* gap: 32px; */
  justify-content: space-between;

  width: 100%;

  margin-top: 24px;
  padding: 8px;

  border-bottom: 2px solid #444;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;

  overflow: visible;

  /* outline: 1px solid white; */

  div.likeAndHateContainer {
    display: flex;

    position: relative;

    button {
      outline: none;
      border: none;
      background: none;

      cursor: pointer;

      svg {
        font-size: 20px;

        transition: transform 0.25s;
      }
    }

    div.likeAndHateWrap {
      div.likeAndHatePopup {
        display: none;
        flex-direction: column;
        align-items: flex-start;

        position: absolute;
        top: -135%;
        left: 0;

        div.likeAndHate {
          display: flex;
          align-items: center;
          justify-content: space-between;

          width: 66px;
          height: 25px;

          background: white;
          border-radius: 4px;

          button:hover {
            svg {
              transform: scale(1.1, 1.1);
            }
          }

          /* button:active {
            &:active {
              transform: scale(1.12, 1.12);
            }
          } */

          button.like {
            color: #ff6633;
          }

          button.hate {
            color: #8b00ff;
          }
        }

        &::after {
          content: "";
          margin-left: 9px;

          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 5px solid white;
        }
      }

      &:hover {
        div.likeAndHatePopup {
          display: flex;
        }
      }

      // 마우스 포인터의 유무를 감지해서 모바일과 pc를 감지 - https://velog.io/@juunini/CSS%EB%A1%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EB%94%94%EB%B0%94%EC%9D%B4%EC%8A%A4%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%8C%90%EB%B3%84%ED%95%B4%EB%82%BC-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C
      @media (pointer: coarse) {
        &:hover {
          div.likeAndHatePopup {
            display: none;
          }
        }
      }

      button.emptyLike {
        color: white;

        transition: transform 0.2s;

        svg.userLike {
          color: #ff6633;
        }
        /* 
        &:active {
          transform: scale(1.2, 1.2);
        } */
      }
    }

    span.likeCounter {
    }
  }

  button.commentBtn {
    outline: 1px solid white;
    border: none;
    background: none;

    color: white;

    cursor: pointer;
  }
`;

export default SweetActionsStyle;
