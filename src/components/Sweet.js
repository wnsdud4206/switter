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
import SweetComment from "./SweetComment";

// edit모드와 아닐때의 컴포넌트를 각각 만들어서 넣어야할듯

const Sweet = ({ sweetObj, isOwner }) => {
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(false);
  const [newSweetText, setNewSweetText] = useState(sweetObj.text);
  const [deleteBox, setDeleteBox] = useState(false);
  const [attachment, setAttachment] = useState(sweetObj.attachmentUrl);
  const [sweetSize, setSweetSize] = useState(0);
  const [closeUpImg, setCloseUpImg] = useState("");
  const [visibleCloseUpImg, setVisibleCloseUpImg] = useState(false);
  const [innerSize, setInnerSize] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const fileInput = useRef();
  const sweetContainerRef = useRef();

  const getUserName = async () => {
    const d = doc(dbService(), "users", `${sweetObj.creatorId}`);
    const docSnap = await getDoc(d);
    setUserName(docSnap.data().displayName);
  };

  const sweetSizing = useCallback(() => {
    // console.log(`${sweetObj.text}: ${sweetContainerRef.current.offsetHeight}`);
    setSweetSize(sweetContainerRef.current.offsetHeight);
  }, []);
  useEffect(() => {
    sweetSizing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, showComment]);

  // 반대로도 textarea의 사이즈를 p태그에 주기, 그래야 자연스러운 애니메이션이 될듯

  // 수정해야함
  useEffect(() => {
    getUserName();
    // if ()
    if (window.innerHeight >= window.innerWidth) {
      setInnerSize(false);
    } else if (window.innerHeight < window.innerWidth) {
      setInnerSize(true);
    }
    console.log(innerSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const onEditing = () => {
    setEditing(true);
    setNewSweetText(sweetObj.text);
  };
  const offEditing = () => {
    setEditing(false);
    setNewSweetText(sweetObj.text);
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

      offEditing();
    } catch (error) {
      console.error(error);
    }
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

  const onCloseUpImg = (e) => {
    if (!visibleCloseUpImg) {
      // img closeUp
      setCloseUpImg(e.target.src);
      setVisibleCloseUpImg(true);
    } else if (visibleCloseUpImg) {
      // img closeDown?
      setVisibleCloseUpImg(false);
      setTimeout(() => setCloseUpImg(""), 260);
    }
  };

  const onShowComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <SweetStyle
      className={deleteBox ? "fadeout" : ""}
      // sweetPaddingSize={sweetPaddingSize}
      sweetSize={sweetSize}
      editing={editing}
      innerSize={innerSize}
    >
      {/* <div className="sweetPadding" ref={sweetPaddingRef}> */}
      <div className="sweetPadding">
        <div className="sweetSize">
          <div className="sweetContainer" ref={sweetContainerRef}>
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
                      <button onClick={offEditing}>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                    <div className="paddingBox">
                      <textarea
                        placeholder="Edit your sweet"
                        value={newSweetText}
                        onChange={onChange}
                        maxLength="1200"
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
                      className="sweetUpdatefileBtn"
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
                {/* <div className="textWrap"> */}
                <div className="nameAndBtn">
                  <span>{userName}</span>
                  {isOwner && (
                    <div className="btnWrap">
                      <button className="editBtn" onClick={onEditing}>
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
                      onClick={onCloseUpImg}
                    />
                  </div>
                )}
                <SweetActoins
                  sweetObj={sweetObj}
                  onShowComment={onShowComment}
                  showComment={showComment}
                />
                {showComment && <SweetComment />}
              </>
            )}
          </div>
        </div>
      </div>

      {closeUpImg && (
        <div
          className={`closeUpImgContainer ${!visibleCloseUpImg && "visible"}`}
          onClick={onCloseUpImg}
        >
          <div className="closeUpImgSize">
            <img
              src={closeUpImg}
              width="100%"
              height="100%"
              alt="CloseUpSweetImage"
            />
          </div>
        </div>
      )}
    </SweetStyle>
  );
};

export default React.memo(Sweet);
