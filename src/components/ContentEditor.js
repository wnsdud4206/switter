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
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { editActions } from "store/contentEditStore";
import { useDispatch, useSelector } from "react-redux";

const ContentEditorStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  div#bg {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    // 스크롤 막는법?

    div#createBox {
      background-color: #222;
      width: 470px;
      /* width: 45vw; */
      /* 모바일에서 줄이기?? */

      /* pointer-events: none; */

      padding: 8px 0;
      border-radius: 8px;
      border: 1px solid rgb(219, 219, 219);

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        label[for="fileBtn"] {
          font-size: 1.2rem;

          cursor: pointer;

          outline: 1px solid red;

          svg {
          }

          input[type="file"] {
            /* display: none; */
          }

          &.none {
            color: #ccc;

            pointer-events: none;
          }
        }

        div#selectImage {
          display: flex;

          width: 100%;
          height: 104px;

          overflow-y: hidden;
          overflow-x: auto;

          &::-webkit-scrollbar {
            height: 8px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #9953e2;
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }

          outline: 1px solid red;

          div.selectImageWrap {
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
          flex-direction: column;
          align-items: center;
          gap: 32px;

          width: 100%;

          border: none;
          margin: 0;
          padding: 0 8px;
          box-sizing: border-box;

          outline: 1px solid red;

          input[type="text"] {
            background: none;
            outline: none;
            border: none;

            color: white;

            width: 100%;
            font-size: 1.1rem;
            padding: 4px;
          }

          label[for="submitBtn"] {
            display: flex;
            justify-content: center;
            align-items: center;

            background-color: #9953e2;
            border-radius: 50%;
            padding: 8px;

            cursor: pointer;

            svg {
              font-size: 28px;
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
  const { content } = useSelector((state) => state);
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState([]);
  const fileInput = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (content) {
      const ok = window.confirm("Are you sure you want to delete this sweet?");
      if (ok) {
        dispatch(
          editActions.editContent({
            mode: false,
            attachment,
            text,
            content,
          }),
        );
      }
    } else {
      dispatch(
        editActions.newContent({
          mode: false,
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
    e.target.id === "bg" &&
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

  return (
    <ContentEditorStyle>
      <div id="bg" onClick={onEditCancel}>
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
            <div id="selectImage">
              {attachment.length ? (
                <>
                  {attachment.map((att, i) => (
                    <div key={i} className="selectImageWrap">
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
                value={text}
                onChange={onChange}
                type="text"
                placeholder="What's on you mind?"
                maxLength={120}
              />
              <label htmlFor="submitBtn">
                <FontAwesomeIcon icon={faCheck} />
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
