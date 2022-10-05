import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
  dbService,
  storageService,
  ref,
  deleteObject,
  getDoc,
} from "fbase";
import SweetStyle from "styles/SweetStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SweetActoins from "./SweetActions";

const Sweet = ({ sweetObj, isOwner }) => {
  // editing과 newSweet은 분리시켜야 한다.
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(false);
  const [newSweetText, setNewSweetText] = useState(sweetObj.text);
  const [deleteBox, setDeleteBox] = useState(false);
  const [attachment, setAttachment] = useState(sweetObj.attachmentUrl);
  const [sweetPaddingSize, setSweetPaddingSize] = useState(0);
  const [textareaHeight, setTextareaHeight] = useState(0);
  // const [closeUp, setCloseUp] = useState(false);
  const [closeUpImg, setCloseUpImg] = useState("");
  const [visibleCloseUpImg, setVisibleCloseUpImg] = useState(false);

  const fileInput = useRef();
  const sweetPaddingRef = useRef();
  const textareaRef = useRef();

  const getUserName = async () => {
    const d = doc(dbService(), "users", `${sweetObj.creatorId}`);
    const docSnap = await getDoc(d);
    setUserName(docSnap.data().displayName);
  };

  useEffect(() => {
    getUserName();
  }, []);

  // 삭제, deleteDoc
  const onDeleteClick = async () => {
    // try {
    const ok = window.confirm("Are you sure you want to delete this sweet?");
    if (ok) {
      setDeleteBox(true);
      setTimeout(async () => {
        const d = doc(dbService(), "sweets", `${sweetObj.id}`);
        await deleteDoc(d);

        if (sweetObj.attachmentUrl) {
          // storage에 들어가는 이미지파일의 이름은 uuid 아니었나? 근데 이렇게 해도 잘 지워지네? 근데 왜 가끔 에러가 뜨지? - 이미지가 없는 sweet을 지우려니까 없는 것 찾으려고 해서 에러가 난듯
          const r = ref(storageService(), sweetObj.attachmentUrl);
          await deleteObject(r);
        }
      }, 250);
    }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // 수정, updateDoc
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  // async&await는 써도되고 안써도 된다. 어떤 방법을 써도 snapshot 덕분에 업데이트는 확인할 수 있기 때문이다.
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (sweetObj.attachmentUrl && sweetObj.attachmentUrl !== attachment) {
        const r = ref(storageService(), sweetObj.attachmentUrl);
        await deleteObject(r);
      }

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      await updateDoc(d, { text: newSweetText, attachmentUrl: attachment });

      toggleEditing();
    } catch (error) {
      console.error(error);
    }
  };

  const resizeTextarea = () => {
    setTextareaHeight(textareaRef.current?.scrollHeight);
    // console.log(textareaRef.current.value.match(/\n/g));
  };

  const onChange = ({ target: { value } }) => {
    setNewSweetText(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // onloadend에 finishedEvent의 result를 setAttachment로 설정해주는 것
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };

  const sweetSizing = useCallback(() => {
    setSweetPaddingSize(sweetPaddingRef.current.offsetHeight);
  }, []);
  useEffect(() => {
    sweetSizing();
    resizeTextarea();
    if (!editing) setNewSweetText(sweetObj.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  return (
    <SweetStyle
      className={deleteBox ? "fadeout" : ""}
      sweetPaddingSize={sweetPaddingSize}
      editing={editing}
      textareaHeight={textareaHeight}
    >
      <div id="sweetPadding" ref={sweetPaddingRef}>
        <div id="sweetContainer">
          {editing ? (
            // profile image 변경 추가
            <>
              {/* 왜 form안에 넣어줬지? input은 무조건 form 안에 있어야 하나? */}
              <form onSubmit={onSubmit}>
                {/* required는 아무것도 입력하지 않고 제출하면 경고창이 뜨게 해주는 속성 */}
                <div className="textEditWrap">
                  {/* <input
                    type="text"
                    placeholder="Edit your sweet"
                    value={newSweetText}
                    onChange={onChange}
                    required
                  /> */}
                  <div className="btnWrap">
                    <label>
                      <FontAwesomeIcon icon={faPencil} />
                      <input type="submit" value="Update Sweet" />
                    </label>
                    <button onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                  <div className="paddingBox">
                    <textarea
                      placeholder="Edit your sweet"
                      value={newSweetText}
                      onChange={onChange}
                      onKeyDown={resizeTextarea}
                      onKeyUp={resizeTextarea}
                      maxLength="1200"
                      ref={textareaRef}
                      required
                      autoFocus
                    ></textarea>
                  </div>
                </div>

                {attachment && (
                  <div className="sweetImg">
                    <img
                      src={attachment}
                      width="100%"
                      height="100%"
                      alt="sweetImage"
                      onLoad={sweetSizing}
                    />
                    <button onClick={onClearAttachmentClick}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                )}

                <label htmlFor="sweetUpdatefileBtn">
                  Edit photo
                  <FontAwesomeIcon icon={faPlus} />
                  <input
                    id="sweetUpdatefileBtn"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                  />
                </label>
              </form>
            </>
          ) : (
            <>
              {/* <div id="textWrap"> */}
              <div className="nameAndBtn">
                <span>{userName}</span>
                {isOwner && (
                  <div className="btnWrap">
                    <button className="editBtn" onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="deleteBtn" onClick={onDeleteClick}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
              <p>{sweetObj.text}</p>
              {sweetObj.attachmentUrl && (
                <div className="sweetImg">
                  <img
                    src={sweetObj.attachmentUrl}
                    width="100%"
                    height="100%"
                    alt="sweetImage"
                    onLoad={sweetSizing}
                    onClick={(e) => {
                      setCloseUpImg(e.target.src);
                      setVisibleCloseUpImg(true);
                    }}
                  />
                </div>
              )}
              <SweetActoins />
            </>
          )}
        </div>
      </div>

      {visibleCloseUpImg && (
        <div
          className={`closeUpImgContainer ${!visibleCloseUpImg && "visible"}`}
          onClick={(e) => {
            setVisibleCloseUpImg(false);
            setTimeout(() => setCloseUpImg(""), 260);
          }}
        >
          {/* <div className="closeUpImgSize"> */}
          <img
            src={closeUpImg}
            width="80%"
            height="80%"
            alt="CloseUpSweetImage"
          />
          {/* </div> */}
        </div>
      )}
    </SweetStyle>
  );
};

export default React.memo(Sweet);
