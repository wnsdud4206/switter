import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
  dbService,
  storageService,
  ref,
  deleteObject,
} from "fbase";
import SweetStyle from "styles/SweetStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import SweetActoins from "./SweetActions";

const Sweet = ({ sweetObj, isOwner, sweetContainerSize }) => {
  // editing과 newSweet은 분리시켜야 한다.
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  const [deleteBox, setDeleteBox] = useState(false);
  const [closeUp, setCloseUp] = useState(false);

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
      }, 200);
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
    const d = doc(dbService(), "sweets", `${sweetObj.id}`);
    await updateDoc(d, { text: newSweet });
    toggleEditing();
  };
  const onChange = ({ target: { value } }) => {
    setNewSweet(value);
  };

  useEffect(() => {
    // sweet 갯수만큼 반복호출되는 문제
    sweetContainerSize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, closeUp]);

  const onCloseUpImgToggle = () => {
    setCloseUp((prev) => !prev);
  };

  return (
    <SweetStyle className={deleteBox && "fadeout"} editing={editing}>
      {editing ? (
        // profile image 변경 추가
        <>
          {/* 왜 form안에 넣어줬지? input은 무조건 form 안에 있어야 하나? */}
          <form onSubmit={onSubmit}>
            {/* required는 아무것도 입력하지 않고 제출하면 경고창이 뜨게 해주는 속성 */}
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              onChange={onChange}
              required
            />
            <label>
              <FontAwesomeIcon icon={faPencil} />
              <input type="submit" value="Update Sweet" />
            </label>
          </form>
          <button onClick={toggleEditing}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      ) : (
        <>
          {/* <div id="textWrap"> */}
          <div id="nameAndBtn">
            <span>{sweetObj.displayName}</span>
            {isOwner && (
              <div id="btnWrap">
                <button id="editBtn" onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button id="deleteBtn" onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
          <div id="textAndImg">
            <p>{sweetObj.text}</p>
            {/* </div> */}
            {sweetObj.attachmentUrl && (
              <img
                src={sweetObj.attachmentUrl}
                width="50px"
                height="50px"
                alt="sweetImage"
                onClick={onCloseUpImgToggle}
              />
            )}
          </div>
          {closeUp && (
            <div id="closeUpImg">
              <img
                src={sweetObj.attachmentUrl}
                width="100%"
                height="100%"
                alt="sweetImage"
              />
            </div>
          )}
          <SweetActoins />
        </>
      )}
    </SweetStyle>
  );
};

export default Sweet;
