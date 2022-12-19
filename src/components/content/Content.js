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
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import ContentAction from "./ContentAction";
import { useDispatch } from "react-redux";
import { boxActions } from "reducers/contentBoxReducer";
import { editActions } from "reducers/contentEditReducer";
import ContentStyle from "styles/content/ContentStyle";
import User from "components/User";

const Content = ({ content, userObj }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [contentObj, setContentObj] = useState(content);
  const [imageSize, setImageSize] = useState(0);
  const dispatch = useDispatch();
  const imageSizeRef = useRef();

  const contentRef = useRef();

  // redux로 아래 observer 조건에 따라 더 불러오는 로직을 짜야할 듯?
  // useEffect(() => {
  //   let observer = new IntersectionObserver((e) => {
  //     console.log(e[0]);
  //   });
  //   observer.observe(contentRef.current);
  // }, []);

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
    // 렌더링할 때 크기조절이 왜케 느리지..
    setImageSize(imageSizeRef.current?.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          contentObj.attachmentUrl.forEach(async (att) => {
            const r = ref(storageService(), att);
            await deleteObject(r);
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onContentBox = () => dispatch(boxActions.onContentBox(contentObj));

  return (
    <ContentStyle className="content" ref={contentRef}>
      <div className="contentHeader">
        <User
          name={contentObj.creatorDisplayName}
          image={contentObj.creatorAttachmentUrl}
        />

        {/* {contentObj.creatorId === authService().currentUser.uid && ( */}
        {contentObj.creatorId === userObj.uid && (
          <div className="contentMenuBox">
            <nav className="contentMenu">
              <button className="contentMenuHover">
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
