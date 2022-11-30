import React, { useEffect, useRef, useState } from "react";
import {
  dbService,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  onSnapshot,
  orderBy,
  authService,
  deleteDoc,
  setDoc,
  deleteField,
  ref,
  storageService,
  deleteObject,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ContentAction from "./ContentAction";
import { useDispatch } from "react-redux";
import { boxActions } from "reducers/contentBoxReducer";
import { editActions } from "reducers/contentEditReducer";
import {
  faPenToSquare,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import ContentStyle from "styles/content/ContentStyle";


const Content = ({ content, userObj }) => {
  const [imgError, setImgError] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [contentObj, setContentObj] = useState(content);
  const dispatch = useDispatch();

  const getCreator = async () => {
    const d = doc(dbService(), "users", `${content.creatorId}`);
    const docSnap = await getDoc(d);
    const creatorDisplayName = docSnap.data().displayName;
    const creatorAttachmentUrl = docSnap.data().attachmentUrl;

    setContentObj((prev) => ({
      ...prev,
      creatorDisplayName,
      creatorAttachmentUrl,
    }));

    // console.log(docSnap.data().comments.length || 0);
    // setCommentLength(docSnap.data().comments.length || 0);
  };

  useEffect(() => {
    getCreator();
  }, []);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const onEditing = () => {
    dispatch(editActions.onEdit({ mode: true, contentObj }));
    // contentEditor에게 현재 content의 정보를 보내는 방법?
  };

  const sliderBtn = (e, urlArr) => {
    if (e.target.className === "prev")
      slideIndex === 0
        ? setSlideIndex(urlArr.length - 1)
        : setSlideIndex((prev) => prev - 1);
    else if (e.target.className === "next")
      slideIndex === urlArr.length - 1
        ? setSlideIndex(0)
        : setSlideIndex((prev) => prev + 1);
    else console.error("slider button error");
  };

  const onDeleteClick = async () => {
    // try {
    const ok = window.confirm("Are you sure you want to delete this content?");
    if (ok) {
      try {
        const contentId = contentObj.id;

        const contentDoc = doc(dbService(), "contents", `${contentId}`);

        const commentQuery = query(
          collection(dbService(), "comments"),
          where("contentId", "==", contentId),
        );
        const commentDocs = await getDocs(commentQuery);
        commentDocs.docs.forEach(async (commentDoc) => {
          const d = doc(dbService(), "comments", commentDoc.id);
          await deleteDoc(d);
        });

        const noticeQuery = query(collection(dbService(), "notifications"));
        const noticeDocs = await getDocs(noticeQuery);
        noticeDocs.docs.forEach(async (noticeDoc) => {
          if (Object.keys(noticeDoc.data()).includes(contentId)) {
            const notice = doc(dbService(), "notifications", noticeDoc.id);
            await setDoc(
              notice,
              {
                [contentId]: deleteField(),
              },
              { merge: true },
            );
          }
        });

        await deleteDoc(contentDoc);

        if (contentObj.attachmentUrl) {
          // storage에 들어가는 이미지파일의 이름은 uuid 아니었나? 근데 이렇게 해도 잘 지워지네? 근데 왜 가끔 에러가 뜨지? - 이미지가 없는 content을 지우려니까 없는 것 찾으려고 해서 에러가 난듯
          const r = ref(storageService(), contentObj.attachmentUrl);
          await deleteObject(r);
        }
      } catch (error) {
        console.error(error);
      }
    }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const onContentBox = () => {
    dispatch(boxActions.onContentBox(contentObj));
  };

  return (
    <ContentStyle className="content">
      <div className="contentHeader">
        <Link
          className="creatorWrap"
          to={`/profile/${contentObj.creatorDisplayName}`}
        >
          <div className="creatorAttachment">
            {contentObj.creatorAttachmentUrl && !imgError ? (
              <img
                src={contentObj.creatorAttachmentUrl}
                width="40"
                height="40"
                alt="contentUserImage"
                onError={onError}
                loading="lazy"
              />
            ) : (
              <FontAwesomeIcon
                className="creatorAttachmentIcon"
                icon={faUser}
              />
            )}
          </div>

          <span className="creatorName">{contentObj.creatorDisplayName}</span>
        </Link>

        {contentObj.creatorId === userObj.uid && (
          <div className="headerBtnWrap">
            <button className="editBtn" onClick={onEditing} title="contentEdit">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              className="removeBtn"
              onClick={onDeleteClick}
              title="contentDelete"
            >
              <FontAwesomeIcon icon={faSquareMinus} />
            </button>
          </div>
        )}
      </div>

      {contentObj.attachmentUrl && (
        <div className="contentImagesWrap">
          <div
            className="contentImages"
            style={{ transform: `translateX(${slideIndex * -468}px)` }}
          >
            {contentObj.attachmentUrl.map((url, i) => (
              <div
                key={contentObj.id + i}
                // className={`contentImage ${i === slideIndex && "active"}`}
                className="contentImage"
              >
                <img
                  src={url}
                  width="468px"
                  height="100%"
                  alt="contentImage"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {contentObj.attachmentUrl.length > 1 && (
            <>
              <button
                className="prev"
                title="prev"
                onClick={(e) => sliderBtn(e, contentObj.attachmentUrl)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className="next"
                title="next"
                onClick={(e) => sliderBtn(e, contentObj.attachmentUrl)}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}
        </div>
      )}
      <div className="contentText" onClick={onContentBox}>
        <p>{contentObj.text}</p>
      </div>

      <ContentAction contentObj={contentObj} onContentBox={onContentBox} />

      {/* {contentObj.firstComment && (
        <div className="contentComments">
          <b>{contentObj.firstCommentName}</b>/{contentObj.firstComment}
        </div>
      )} */}
    </ContentStyle>
  );
};

export default Content;
