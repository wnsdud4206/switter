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
import { editActions } from "modules/contentEditReducer";

const ContentStyle = styled.div`
  width: 100%;
  /* height: 500px; */

  border: 1px solid white;
  box-sizing: border-box;

  div.contentHeader {
    display: flex;
    align-items: center;

    padding: 8px;

    outline: 1px solid white;

    div.creatorAttachment {
      display: flex;
      align-items: flex-end;
      justify-content: center;

      width: 40px;
      height: 40px;

      border-radius: 50%;
      overflow: hidden;

      cursor: pointer;

      img {
      }

      svg {
        font-size: 32px;
      }
    }

    span.creatorName {
      margin-left: 8px;

      cursor: pointer;
    }
  }

  // ContentBox.js에서도 쓰니까 묶어놔도 좋을 듯
  div.contentImagesWrap {
    position: relative;

    overflow: hidden;

    outline: 1px solid orange;

    div.contentImages {
      display: flex;
      align-items: center;

      background-color: #444;

      /* transform: translateX(-468px); */

      outline: 1px solid red;

      // prev, next button

      div.contentImage {

        // 하단 여백 제거하기
        // height 크기 고정 - display none으로 해서 그런듯
        // insta에서는 display flex row, translate로 줌

        img {
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

      width: 24px;
      height: 24px;

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
      opacity: 0.5;

      &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  div.contentText {
    padding: 8px;
  }

  div.contentActions {
  }

  div.contentComments {
    padding: 8px;
  }
`;

const Content = ({ content }) => {
  const [imgError, setImgError] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const dispatch = useDispatch();

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const onEditing = () => {
    dispatch(editActions.onEdit({ mode: true, content }));
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
        const contentDoc = doc(dbService(), "contents", `${content.id}`);

        const commentQuery = query(
          collection(dbService(), "comments"),
          where("contentId", "==", content.id),
        );
        const commentDocs = await getDocs(commentQuery);
        commentDocs.docs.forEach(async (commentDoc) => {
          const d = doc(dbService(), "comments", commentDoc.id);
          await deleteDoc(d);
        });

        const noticeQuery = query(collection(dbService(), "notifications"));
        const noticeDocs = await getDocs(noticeQuery);
        noticeDocs.docs.forEach(async (noticeDoc) => {
          if (Object.keys(noticeDoc.data()).includes(content.id)) {
            const notice = doc(dbService(), "notifications", noticeDoc.id);
            await setDoc(
              notice,
              {
                [content.id]: deleteField(),
              },
              { merge: true },
            );
          }
        });

        await deleteDoc(contentDoc);

        if (content.attachmentUrl) {
          // storage에 들어가는 이미지파일의 이름은 uuid 아니었나? 근데 이렇게 해도 잘 지워지네? 근데 왜 가끔 에러가 뜨지? - 이미지가 없는 content을 지우려니까 없는 것 찾으려고 해서 에러가 난듯
          const r = ref(storageService(), content.attachmentUrl);
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
        <div className="creatorAttachment">
          {content.creatorAttachmentUrl && !imgError ? (
            <img
              src={content.creatorAttachmentUrl}
              width="40"
              height="40"
              alt="contentUserImage"
              onError={onError}
            />
          ) : (
            <FontAwesomeIcon id="profileicon" icon={faUser} />
          )}
        </div>

        <span className="creatorName">
          <b>{content.creatorDisplayName}</b>
        </span>
        {/* </Link> */}

        <button onClick={onEditing}>편집 버튼</button>
        <button onClick={onDeleteClick}>삭제 버튼</button>
      </div>

      {content.attachmentUrl && (
        <div className="contentImagesWrap">
          <div
            className="contentImages"
            style={{ transform: `translateX(${slideIndex * -468}px)` }}
          >
            {content.attachmentUrl.map((url, i) => (
              <div
                key={content.id + i}
                // className={`contentImage ${i === slideIndex && "active"}`}
                className="contentImage"
              >
                <img src={url} width="468px" height="100%" alt="contentImage" />
              </div>
            ))}
          </div>
          {content.attachmentUrl.length > 1 && (
            <>
              <button
                className="prev"
                onClick={(e) => sliderBtn(e, content.attachmentUrl)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className="next"
                onClick={(e) => sliderBtn(e, content.attachmentUrl)}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}
        </div>
      )}
      <div className="contentText">
        <p>{content.text}</p>
      </div>

      <ContentAction content={content} />

      {content.firstComment && (
        <div className="contentComments">
          <b>{content.firstCommentName}</b>/{content.firstComment}
        </div>
      )}
    </ContentStyle>
  );
};

export default Content;
