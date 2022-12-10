import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { editActions } from "reducers/contentEditReducer";
import { useDispatch, useSelector } from "react-redux";
import ContentEditorStyle from "styles/content/ContentEditorStyle";

const ContentEditor = ({ userObj }) => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.editState);
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState([]);
  const fileInput = useRef();
  const imagesWrapRef = useRef();

  // 팔로우 새 글

  const onSubmit = (e) => {
    e.preventDefault();

    if (content) {
      const ok = window.confirm(
        "Are you sure you want to delete this content?",
      );
      if (ok)
        dispatch(
          editActions.editContent({
            attachment,
            text,
            uid: userObj.uid,
            content,
          }),
        );
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
    setAttachment("");
    fileInput.current.value = "";
    // dispatch(editActions.offEdit(false));
  };

  const onChange = ({ target: { value } }) => setText(value);

  const onFileChange = ({ target: { files } }) => {
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
    }
  };

  const onClearAttachmentClick = (e, att) => {
    e.preventDefault();
    const newAttachment = attachment.filter((url) => url !== att);
    setAttachment(newAttachment);
  };

  const onEditCancel = (e) =>
    e.target.id === "contentEditBackground" &&
    dispatch(editActions.offEdit({ mode: false, content: null }));

  useEffect(() => {
    if (content) {
      const newText = content.text;
      const newAttachmentUrl = [...content.attachmentUrl];
      setText(newText);
      setAttachment(newAttachmentUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // drag&drop - https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5
  // attachment state<array> 순서도 바꿔줘야 함
  // items event
  const onDragStart = ({ target }) => target.classList.add("dragging");
  const onDragEnd = ({ target }) => {
    target.classList.remove("dragging");
    // console.log(attachment);

    // console.log(imagesWrapRef.current);
    const wrapChild = [...imagesWrapRef.current.children];
    setAttachment([]);
    for (let child of wrapChild)
      setAttachment((prev) => [...prev, child.children[0].src]);
  };

  // container event
  const getDragAfterElement = (wrap, x) => {
    const draggableElements = [
      // ...wrap.querySelectorAll(".draggable:not(.dragging)"),
      ...wrap.children,
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
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
    if (afterElement === undefined) e.currentTarget.appendChild(draggable);
    else e.currentTarget.insertBefore(draggable, afterElement);
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
