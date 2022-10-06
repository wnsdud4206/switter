import styled from "styled-components";

const SweetActionsStyle = styled.div`
  display: flex;
  /* gap: 32px; */
  justify-content: space-between;

  width: 100%;

  margin: 16px 0 8px;
  padding: 0 8px;
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
