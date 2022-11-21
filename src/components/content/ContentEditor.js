import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  storageService,
  ref,
  uploadString,
  getDownloadURL,
  collection,
  dbService,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faChevronLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { editActions } from "reducers/contentEditReducer";
import { useDispatch, useSelector } from "react-redux";

const ContentEditorStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  div#contentEditBackground {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    // 스크롤 막는법?

    div#createBox {
      background-color: var(--background-color);
      width: 470px;
      /* width: 45vw; */
      /* 모바일에서 줄이기?? */

      /* pointer-events: none; */

      padding: 8px 0;
      border-radius: 8px;
      border: 1px solid var(--border-color);

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        label[for="fileBtn"] {
          font-size: 1.2rem;

          cursor: pointer;

          svg {
          }

          input[type="file"] {
            display: none;
          }

          &.none {
            color: #ccc;

            pointer-events: none;
          }
        }

        div#selectImageWrap {
          display: flex;

          width: 100%;
          height: 104px;

          overflow-y: hidden;
          overflow-x: auto;

          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          box-sizing: border-box;

          &::-webkit-scrollbar {
            height: 8px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: var(--personal-color);
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }

          div.selectImage {
            position: relative;

            img {
            }

            button {
              background: none;
              border: none;
              outline: none;

              padding: 0;

              width: 16px;
              height: 16px;

              position: absolute;
              top: 0;
              right: 0;

              opacity: 0;

              transition: opacity 0.2s;

              outline: 1px solid red;

              cursor: pointer;

              svg {
                color: white;
                font-size: 16px;
              }
            }

            &:hover > button {
              opacity: 1;
            }
          }

          p {
            width: 100%;
            text-align: center;
          }
        }

        fieldset {
          display: flex;
          /* flex-direction: column; */
          align-items: flex-end;

          width: 100%;

          border: none;
          margin: 0;
          box-sizing: border-box;

          input[type="text"] {
            background: none;
            outline: none;
            border: none;

            color: var(--sub-color);
            font-size: 1.1rem;

            width: 100%;
            border-bottom: 2px solid var(--sub-color);
            box-sizing: border-box;
            padding-bottom: 4px;
            padding-left: 12px;

            &:focus + label[for="submitBtn"] {
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

          label[for="submitBtn"] {
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

            /* background-color: var(--icon-color); */
            /* border: 2px solid var(--icon-color);
            border-radius: 50%;
            padding: 6px; */

            cursor: pointer;

            &:hover > svg {
              transform: rotateZ(90deg);
            }

            svg {
              color: var(--icon-color);
              /* font-size: 28px; */

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
                  animation: jump 1.2s .5s infinite alternate;
                }
                &.textingCircle2 {
                  animation: jump 1.2s .6s infinite alternate;
                }
                &.textingCircle3 {
                  animation: jump 1.2s .7s infinite alternate;
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
`;

const ContentEditor = ({ userObj }) => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.editState);
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState([]);
  const fileInput = useRef();
  const imagesWrapRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (content) {
      const ok = window.confirm(
        "Are you sure you want to delete this content?",
      );
      if (ok) {
        dispatch(
          editActions.editContent({
            attachment,
            text,
            uid: userObj.uid,
            content,
          }),
        );
      }
    } else {
      dispatch(
        editActions.newContent({
          attachment,
          text,
          uid: userObj.uid,
        }),
      );
    }

    setText("");
    setAttachment(""); // 미리보기 사진 제거
    fileInput.current.value = ""; // 올리고F 선택된 파일 해제
    // dispatch(editActions.offEdit(false));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    // 실행되는 순서를 보고 실행?
    if (attachment.length < 10) {
      const reader = new FileReader();
      let i = 0;
      const multiRead = () => {
        reader.onload = (finishedEvent) => {
          const {
            currentTarget: { result },
          } = finishedEvent;
          setAttachment((prev) => [...prev, result]);

          if (i < files.length) multiRead();
        };
        reader.readAsDataURL(files[i]);
        i++;
      };
      multiRead();
      // 이제 드레그앤드롭으로 순서 바꿀 수 있게

      // for (let file of files) {
      //   reader.onload = (finishedEvent) => {
      //     // onloadend에 finishedEvent의 result를 setAttachment로 설정해주는 것
      //     const {
      //       currentTarget: { result },
      //     } = finishedEvent;
      //     setAttachment((prev) => [...prev, result]);
      //   };
      //   // 다중 파일 인코딩은 다음에 알아보기.. - https://developer.mozilla.org/ko/docs/Web/API/FileReader
      //   reader.readAsDataURL(file);
      // }
    }
  };
  const onClearAttachmentClick = (e, att) => {
    e.preventDefault();
    const newAttachment = attachment.filter((url) => url !== att);
    setAttachment(newAttachment);
    // fileInput.current.value = "";
  };

  const onEditCancel = (e) => {
    // console.log(e.target);   // OOO
    // console.log(e.currentTarget);
    e.target.id === "contentEditBackground" &&
      dispatch(editActions.offEdit({ mode: false, content: null }));
  };

  useEffect(() => {
    if (content) {
      const newText = content.text;
      const newAttachmentUrl = [...content.attachmentUrl];
      setText(newText);
      setAttachment(newAttachmentUrl);
    }
  }, []);

  // drag&drop - https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5
  // attachment state<array> 순서도 바꿔줘야 함
  // items event
  const onDragStart = ({ target }) => {
    target.classList.add("dragging");
  };
  const onDragEnd = ({ target }) => {
    target.classList.remove("dragging");
    // console.log(attachment);

    // console.log(imagesWrapRef.current);
    const wrapChild = [...imagesWrapRef.current.children];
    setAttachment([]);
    for (let child of wrapChild) {
      setAttachment((prev) => [...prev, child.children[0].src]);
    }
  };
  // container event
  const getDragAfterElement = (wrap, x) => {
    const draggableElements = [
      // ...wrap.querySelectorAll(".draggable:not(.dragging)"),
      ...wrap.children,
    ];

    // console.log(wrap.children.filter(el => !String(el).includes("dragging")));

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        // console.log(child);
        // console.log(box);
        // console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  };
  const onDragOver = (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(e.currentTarget, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement === undefined) {
      e.currentTarget.appendChild(draggable);
    } else {
      e.currentTarget.insertBefore(draggable, afterElement);
    }
  };

  return (
    <ContentEditorStyle>
      <div id="contentEditBackground" onClick={onEditCancel}>
        <div id="createBox">
          <form onSubmit={onSubmit}>
            <label
              htmlFor="fileBtn"
              className={`${attachment.length >= 10 && "none"}`}
            >
              Add photo
              <FontAwesomeIcon icon={faPlus} />
              <input
                id="fileBtn"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={fileInput}
                multiple
              />
            </label>
            <div
              id="selectImageWrap"
              onDragOver={onDragOver}
              ref={imagesWrapRef}
            >
              {attachment.length ? (
                <>
                  {attachment.map((att, i) => (
                    <div
                      key={i}
                      className="selectImage"
                      draggable
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    >
                      <img
                        src={att}
                        width="100"
                        height="100"
                        alt="uploadImage"
                        draggable="false"
                      />
                      <button onClick={(e) => onClearAttachmentClick(e, att)}>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <p>empty images</p>
              )}
            </div>

            <fieldset>
              <input
                type="text"
                value={text}
                onChange={onChange}
                placeholder="What's on you mind?"
                maxLength={120}
                required
              />
              <label htmlFor="submitBtn">
                <FontAwesomeIcon icon={faChevronLeft} />
                <div id="texting">
                  <div className="textingCircle textingCircle1"></div>
                  <div className="textingCircle textingCircle2"></div>
                  <div className="textingCircle textingCircle3"></div>
                </div>
                <input id="submitBtn" type="submit" value="Create" />
              </label>
            </fieldset>
          </form>
        </div>
      </div>
    </ContentEditorStyle>
  );
};

export default ContentEditor;
