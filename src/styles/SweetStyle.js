import styled, { css } from "styled-components";

const SweetStyle = styled.div`
  display: flex;
  align-items: flex-start;

  height: 82px;

  color: black;
  background: white;

  border-radius: 10px;

  padding: 4px;

  position: relative;

  animation: boxFadeIn 0.25s ease-in;

  @keyframes boxFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &.fadeout {
    animation: boxFadeOut 0.21s linear;

    @keyframes boxFadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }

  ${(props) =>
    props.editing
      ? css`
          form {
            display: flex;
            align-items: flex-start;

            flex: auto;

            input {
            }

            input[type="text"] {
              margin: 16px 0;
              padding: 0 8px;

              flex: auto;
            }

            label {
              display: flex;
              align-items: center;
              justify-content: center;

              color: #444;
              cursor: pointer;

              transition: color 0.25s;

              &:hover {
                color: #00bdee;
              }

              svg {
                width: 14px;
                height: 14px;

                padding: 4px;
              }

              input[type="submit"] {
                display: none;
              }
            }
          }
          button {
            background: none;
            border: none;
            outline: none;
            color: #444;

            padding: 2px 4px;

            transition: color 0.25s;

            cursor: pointer;

            &:hover {
              color: #ff6633;
            }

            svg {
              width: 18px;
              height: 18px;
            }
          }
        `
      : css`
          div#textWrap {
            width: 100%;

            div#nameAndBtn {
              display: flex;
              justify-content: space-between;

              span {
                padding-left: 4px;
              }

              div#btnWrap {
                button {
                  background: none;
                  border: none;
                  outline: none;
                  color: #444;

                  transition: color 0.25s;

                  cursor: pointer;

                  &#deleteBtn:hover {
                    color: #ff6633;
                  }
                  &#editBtn:hover {
                    color: #00bdee;
                  }
                }
              }
            }

            h4 {
              font-weight: normal;

              margin: 16px 50px 16px 0;
              padding: 0 4px;

              flex: auto;
            }
          }

          img {
            background-color: white;
            position: absolute;
            right: 0px;
            bottom: 0px;

            /* border-radius: 50%; */
            border-radius: 10px;
          }
        `}
`;

export default SweetStyle;

// <SweetStyle>
// {editing ? (
//   <>
//     {/* 왜 form안에 넣어줬지? input은 무조건 form 안에 있어야 하나? */}
//     <form onSubmit={onSubmit}>
//       {/* required는 아무것도 입력하지 않고 제출하면 경고창이 뜨게 해주는 속성 */}
//       <input
//         type="text"
//         placeholder="Edit your sweet"
//         value={newSweet}
//         onChange={onChange}
//         required
//       />
//       <input type="submit" value="Update Sweet" />
//     </form>
//     <button onClick={toggleEditing}>Cancel</button>
//   </>
// ) : (
//   <>
//     <h4>{sweetObj.text}</h4>
//     {sweetObj.attachmentUrl && (
//       <img
//         src={sweetObj.attachmentUrl}
//         width="50px"
//         height="50px"
//         alt="sweetImage"
//       />
//     )}
//     {isOwner && (
//       <>
//         <button onClick={onDeleteClick}>Delete Sweet</button>
//         <button onClick={toggleEditing}>Edit Sweet</button>
//       </>
//     )}
//   </>
// )}
// </SweetStyle>
