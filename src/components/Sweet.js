import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  doc,
  deleteDoc,
  dbService,
  storageService,
  ref,
  deleteObject,
  getDoc,
} from "fbase";
import SweetStyle from "styles/SweetStyle";
import SweetEdit from "./SweetEdit";
import SweetContent from "./SweetContent";
import CloseUpImgContainer from "./CloseUpImgContainer";

// edit모드와 아닐때의 컴포넌트를 각각 만들어서 넣어야할듯

const Sweet = ({ sweetObj, isOwner }) => {
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(false);
  const [newSweetText, setNewSweetText] = useState(sweetObj.text);
  const [deleteBox, setDeleteBox] = useState(false);
  const [sweetSize, setSweetSize] = useState(0);
  const [closeUpImg, setCloseUpImg] = useState("");
  const [showCloseUpImg, setShowCloseUpImg] = useState(false);
  const [scrollComment, setScrollComment] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const sweetContainerRef = useRef();
  const sweetContentRef = useRef();

  const getUserName = async () => {
    const d = doc(dbService(), "users", `${sweetObj.creatorId}`);
    const docSnap = await getDoc(d);
    setUserName(docSnap.data().displayName);
  };

  const sweetSizing = useCallback(() => {
    // console.log(`${sweetObj.text}: ${sweetContainerRef.current.offsetHeight}`);
    let height;
    if (scrollComment) {
      setShowComment(true);
      height = sweetContainerRef.current.offsetHeight;
    } else if (!scrollComment) {
      height = sweetContentRef.current.offsetHeight;
      setTimeout(() => {
        setShowComment(false);
      }, 200);
    }

    setSweetSize(height);
  }, [scrollComment]);
  useEffect(() => {
    sweetSizing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, scrollComment, showComment]);

  useEffect(() => {
    getUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

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

  const onChange = ({ target: { value } }) => {
    setNewSweetText(value);
  };

  const onCloseUpImg = (e) => {
    if (!showCloseUpImg) {
      // img closeUp
      setCloseUpImg(e.target.src);
      setShowCloseUpImg(true);
    } else if (showCloseUpImg) {
      // img closeDown?
      setShowCloseUpImg(false);
      setTimeout(() => setCloseUpImg(""), 260);
    }
  };

  const onScrollComment = () => {
    setScrollComment((prev) => (prev = !prev));
  };

  return (
    <SweetStyle className={deleteBox ? "fadeout" : ""} sweetSize={sweetSize}>
      <div className="sweetPadding">
        <div className="sweetSize">
          <div className="sweetContainer" ref={sweetContainerRef}>
            {editing ? (
              <SweetEdit
                sweetObj={sweetObj}
                offEditing={offEditing}
                newSweetText={newSweetText}
                onChange={onChange}
                sweetSizing={sweetSizing}
              />
            ) : (
              <SweetContent
                userName={userName}
                isOwner={isOwner}
                onEditing={onEditing}
                onDeleteClick={onDeleteClick}
                sweetObj={sweetObj}
                sweetSizing={sweetSizing}
                onCloseUpImg={onCloseUpImg}
                sweetContentRef={sweetContentRef}
                onScrollComment={onScrollComment}
                scrollComment={scrollComment}
                showComment={showComment}
              />
            )}
          </div>
        </div>
      </div>

      {closeUpImg && (
        <CloseUpImgContainer
          showCloseUpImg={showCloseUpImg}
          onCloseUpImg={onCloseUpImg}
          closeUpImg={closeUpImg}
        />
      )}
    </SweetStyle>
  );
};

export default React.memo(Sweet);
