import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  doc,
  deleteDoc,
  dbService,
  storageService,
  query,
  ref,
  deleteObject,
  getDoc,
  collection,
  where,
  onSnapshot,
  getDocs,
  setDoc,
  deleteField,
} from "fbase";
import SweetStyle from "styles/SweetStyle";
import SweetEdit from "./SweetEdit";
import SweetContent from "./SweetContent";
import CloseUpImgContainer from "./CloseUpImgContainer";

// edit모드와 아닐때의 컴포넌트를 각각 만들어서 넣어야할듯

const Sweet = ({ sweetObj, isOwner, userObj, onlyEditing, onOnlyEditing }) => {
  const [userName, setUserName] = useState("");
  const [userAttachmentUrl, setUserAttachmentUrl] = useState("");
  const [editing, setEditing] = useState(false);
  const [commentEditResize, setCommentEditResize] = useState(false);
  const [newSweetText, setNewSweetText] = useState(sweetObj.text);
  const [deleteBox, setDeleteBox] = useState(false);
  const [sweetSize, setSweetSize] = useState(0);
  const [closeUpImg, setCloseUpImg] = useState("");
  const [showCloseUpImg, setShowCloseUpImg] = useState(false);
  const [scrollComment, setScrollComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState({});

  const sweetBoxRef = useRef();
  const sweetContentRef = useRef();

  const getUserName = async () => {
    const d = doc(dbService(), "users", `${sweetObj.creatorId}`);
    const docSnap = await getDoc(d);
    setUserName(docSnap.data().displayName);
    setUserAttachmentUrl(docSnap.data().attachmentUrl);
    // console.log(docSnap.data().comments.length || 0);
    // setCommentLength(docSnap.data().comments.length || 0);
  };

  const getComments = async () => {
    try {
      const q = query(
        collection(dbService(), "comments"),
        where("sweetId", "==", sweetObj.id),
      );

      onSnapshot(q, (snapshot) => {
        // snapshot.docs.map((doc) => {
        //   console.log(doc.data());
        // });
        const commentArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // creatorId, createdAt, text
        }));
        // console.log(commentArr);   // array
        setComments(commentArr);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sweetSizing = useCallback(() => {
    // console.log(`${sweetObj.text}: ${sweetBoxRef.current.offsetHeight}`);
    if (editing) {
      setSweetSize(sweetBoxRef.current.offsetHeight);
    } else if (!editing) {
      let height;
      if (scrollComment) {
        setShowComment(true);
        height = sweetBoxRef.current.clientHeight;
        // console.log(sweetBoxRef.current.clientHeight);
      } else if (!scrollComment) {
        height = sweetContentRef.current.clientHeight;
        // console.log(sweetContentRef.current.clientHeight);
        setTimeout(() => {
          setShowComment(false);
        }, 200);
      }

      setSweetSize(height);
    }
  }, [editing, scrollComment]);

  useEffect(() => {
    // if (sweetObj.likes || sweetObj.comment) {
    //   console.log(sweetObj);
    // }
    getComments();
    sweetSizing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, scrollComment, showComment, comments.length, commentEditResize]);

  useEffect(() => {
    getUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // 삭제, deleteDoc
  const onDeleteClick = () => {
    // try {
    const ok = window.confirm("Are you sure you want to delete this sweet?");
    if (ok) {
      setDeleteBox(true);
      setTimeout(async () => {
        try {
          const sweetDoc = doc(dbService(), "sweets", `${sweetObj.id}`);

          const commentQuery = query(
            collection(dbService(), "comments"),
            where("sweetId", "==", sweetObj.id),
          );
          const commentDocs = await getDocs(commentQuery);
          commentDocs.docs.forEach(async (commentDoc) => {
            const d = doc(dbService(), "comments", commentDoc.id);
            await deleteDoc(d);
          });

          const noticeQuery = query(collection(dbService(), "notifications"));
          const noticeDocs = await getDocs(noticeQuery);
          noticeDocs.docs.forEach(async (noticeDoc) => {
            if (Object.keys(noticeDoc.data()).includes(sweetObj.id)) {
              const notice = doc(dbService(), "notifications", noticeDoc.id);
              await setDoc(
                notice,
                {
                  [sweetObj.id]: deleteField(),
                },
                { merge: true },
              );
            }
          });

          await deleteDoc(sweetDoc);

          if (sweetObj.attachmentUrl) {
            // storage에 들어가는 이미지파일의 이름은 uuid 아니었나? 근데 이렇게 해도 잘 지워지네? 근데 왜 가끔 에러가 뜨지? - 이미지가 없는 sweet을 지우려니까 없는 것 찾으려고 해서 에러가 난듯
            const r = ref(storageService(), sweetObj.attachmentUrl);
            await deleteObject(r);
          }

          // notification(
          //   "REMOVE",
          //   "all",
          //   sweetObj.creatorId,
          //   sweetObj.id,
          //   null,
          //   null,
          // );
        } catch (error) {
          console.error(error);
        }
      }, 250);
    }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const onChange = ({ target: { value } }) => {
    setNewSweetText(value);
  };

  // edit모드 하나만 켜기 어렵다... comment도 해줘야함
  useEffect(() => {
    if (onlyEditing !== sweetObj.id && editing) {
      setEditing(false);
    } else if (onlyEditing !== sweetObj.id && scrollComment) {
      setScrollComment(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyEditing]);

  // 수정, updateDoc
  const onEditing = () => {
    console.log("onEditing");
    onOnlyEditing(sweetObj.id);
    setEditing(true);
    setNewSweetText(sweetObj.text);
  };
  const offEditing = () => {
    setEditing(false);
    onOnlyEditing("");
  };

  const onCommentEditResizeToggle = () => {
    setCommentEditResize((prev) => !prev);
  };
  // const offCommentEditResize = () => {
  //   setCommentEditResize(false);
  // };

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
    onOnlyEditing(sweetObj.id);
    setScrollComment(true);
  };
  const offScrollComment = () => {
    onOnlyEditing("");
    setScrollComment(false);
  };

  return (
    <SweetStyle className={deleteBox ? "fadeout" : ""} sweetSize={sweetSize}>
      <div className="sweetPadding">
        <div className="sweetSize">
          <div className="sweetBox" ref={sweetBoxRef}>
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
                userAttachmentUrl={userAttachmentUrl}
                isOwner={isOwner}
                onEditing={onEditing}
                onDeleteClick={onDeleteClick}
                sweetObj={sweetObj}
                userObj={userObj}
                sweetSizing={sweetSizing}
                onCloseUpImg={onCloseUpImg}
                sweetContentRef={sweetContentRef}
                onScrollComment={onScrollComment}
                offScrollComment={offScrollComment}
                scrollComment={scrollComment}
                showComment={showComment}
                comments={comments}
                onCommentEditResizeToggle={onCommentEditResizeToggle}
                // offCommentEditResize={offCommentEditResize}
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
