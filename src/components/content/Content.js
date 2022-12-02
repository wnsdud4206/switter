import React, { useEffect, useRef, useState } from "react";
import {
  dbService,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  setDoc,
  deleteField,
  ref,
  storageService,
  deleteObject,
  authService,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
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
  const imageSizeRef = useRef();
  const [imageSize, setImageSize] = useState(0)

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
  };

  useEffect(() => {
    getCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 렌더링할 때 크기조절이 왜케 느리지..
  useEffect(() => {
    // console.log(imageSizeRef);
    setImageSize(imageSizeRef.current?.offsetWidth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth])

  const onError = () => setImgError(true);

  const onEditing = () =>
    dispatch(editActions.onEdit({ mode: true, contentObj }));

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
          const r = ref(storageService(), contentObj.attachmentUrl);
          await deleteObject(r);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onContentBox = () => dispatch(boxActions.onContentBox(contentObj));

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

        {contentObj.creatorId === authService().currentUser.uid && (
          <div className="contentMenuBox">
            <nav className="contentMenu">
              <button className="contentMenuBtn">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
              <ul>
                <li>
                  <button
                    className="contentEditBtn"
                    onClick={onEditing}
                    title="editing"
                  >
                    글 수정
                  </button>
                </li>
                <li>
                  <button
                    className="contentDeleteBtn"
                    onClick={onDeleteClick}
                    title="deleting"
                  >
                    글 삭제
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {contentObj.attachmentUrl && (
        <div className="contentImagesWrap">
          <div
            className="contentImages"
            // style={{ transform: `translateX(${slideIndex * -468}px)` }}
            style={{ transform: `translateX(${slideIndex * -imageSize}px)` }}
            ref={imageSizeRef}
          >
            {contentObj.attachmentUrl.map((url, i) => (
              <div key={contentObj.id + i} className="contentImage">
                <img
                  src={url}
                  // width="468px"
                  width={`${imageSize}px`}
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
    </ContentStyle>
  );
};

export default Content;
