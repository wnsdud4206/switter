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
import styled from "styled-components";
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

const ContentStyle = styled.div`
  width: 100%;
  /* height: 500px; */

  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-sizing: border-box;

  div.contentHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px;

    a.creatorWrap {
      display: flex;
      align-items: center;

      text-decoration: none;

      div.creatorAttachment {
        display: flex;
        align-items: flex-end;
        justify-content: center;

        width: 40px;
        height: 40px;

        border-radius: 50%;
        overflow: hidden;

        img {
        }

        svg {
          font-size: 32px;
          color: var(--icon-color);
        }
      }

      span.creatorName {
        margin-left: 8px;

        color: var(--sub-color);
      }
    }

    div.headerBtnWrap {
      display: flex;
      gap: 8px;

      button {
        outline: none;
        background: none;
        border: none;
        padding: 0;

        cursor: pointer;

        svg {
          color: var(--icon-color);

          width: 20px;
          height: 20px;
        }
      }
    }
  }

  // ContentBox.js에서도 쓰니까 묶어놔도 좋을 듯
  div.contentImagesWrap {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);

    position: relative;

    overflow: hidden;

    div.contentImages {
      display: flex;
      align-items: center;

      /* transform: translateX(-468px); */

      // prev, next button

      div.contentImage {
        // 하단 여백 제거하기
        // height 크기 고정 - display none으로 해서 그런듯
        // insta에서는 display flex row, translate로 줌

        img {
          vertical-align: middle;
        }
      }
    }
    button {
      outline: none;
      background: none;
      border: none;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #aaa;

      width: 28px;
      height: 28px;

      padding: 0;
      border-radius: 50%;
      box-sizing: border-box;

      position: absolute;
      top: 50%;

      transform: translateY(-100%);

      opacity: 0;

      transition: all 0.2s;

      cursor: pointer;

      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }

      svg {
        font-size: 16px;

        pointer-events: none;
      }
    }

    &:hover button {
      opacity: 0.7;

      &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  div.contentText {
    padding: 8px;

    cursor: pointer;

    p {
    }
  }

  div.contentActions {
  }

  div.contentComments {
    padding: 8px;
    border-top: 1px solid var(--border-color);
  }
`;

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
        {/* <Link
            to={`/${isOwner ? "profile" : contentObj.creatorId}`}
            onClick={() => {
              if (isOwner) {
                return;
              }
              getId(contentObj.creatorId);
            }}
          > */}
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
              <FontAwesomeIcon id="profileicon" icon={faUser} />
            )}
          </div>

          <span className="creatorName">{contentObj.creatorDisplayName}</span>
        </Link>
        {/* </Link> */}

        {contentObj.creatorId === userObj.uid && (
          <div className="headerBtnWrap">
            <button onClick={onEditing} title="contentEdit">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button onClick={onDeleteClick} title="contentDelete">
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
