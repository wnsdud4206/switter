import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, dbService, doc, getDoc, setDoc } from "fbase";
import { boxActions } from "reducers/contentBoxReducer";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationStyle from "styles/header/nav/notice/NotificationStyle";

const Notification = ({ noticeObj, offNotification, activeNotice }) => {
  const [noticeKey, noticeData] = noticeObj;
  const [contentText, setContentText] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [contentObj, setContentObj] = useState({});
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();

  let contentId, secondId, userId;
  let collection;
  // 이름을 조금 바꿔줘야 할듯 - 정확하지 않음
  if (noticeData.category === "commentLikes") {
    [contentId, secondId, userId] = noticeKey.split("/");
    collection = "comments";
  } else {
    [secondId, userId] = noticeKey.split("/");
    collection = "contents";
  }

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const getContentAndUser = useCallback(async () => {
    try {
      // getContent
      const contentDoc = doc(dbService(), collection, secondId);

      const contentGet = await getDoc(contentDoc);

      // 왜 자꾸 text를 바로바로 못가져 오는 거야..
      let text;
      if (contentGet.data().text?.length > 10) {
        text = `${contentGet.data().text.slice(0, 10)}...`;
      } else {
        text = contentGet.data().text;
      }

      // getUser
      let userDoc;
      if (noticeData.category === "contentComments") {
        const commentDoc = doc(dbService(), "comments", userId);
        const commentGet = await getDoc(commentDoc);

        userDoc = doc(dbService(), "users", commentGet.data().creatorId);
      } else {
        userDoc = doc(dbService(), "users", userId);
      }

      const userGet = await getDoc(userDoc);

      const creatorDisplayName = userGet.data().displayName;
      const creatorAttachmentUrl = userGet.data().attachmentUrl;

      setContentText(text);
      setContentObj({
        ...contentGet.data(),
        creatorDisplayName,
        creatorAttachmentUrl,
      });
      // getContentText, getUserName, getUserImage 를 contentObj 하나로 묶어서 dispatch 하기
    } catch (error) {
      console.error(error);
    }
  }, [collection, noticeData.category, secondId, userId]);

  const onConfirm = async () => {
    const noticeDoc = doc(
      dbService(),
      "notifications",
      authService().currentUser.uid,
    );
    // const noticeSnap = await getDoc(noticeDoc);

    if (noticeData.category === "commentLikes") {
      // console.log(
      //   noticeSnap.data()[contentId][noticeData.category][secondId][noticeKey],
      // );
      await setDoc(
        noticeDoc,
        {
          [contentId]: {
            [noticeData.category]: {
              [secondId]: {
                [noticeKey]: {
                  confirmed: true,
                },
              },
            },
          },
        },
        { merge: true },
      );
    } else {
      // console.log(noticeSnap.data()[secondId][noticeData.category][noticeKey]);
      await setDoc(
        noticeDoc,
        {
          [secondId]: {
            [noticeData.category]: {
              [noticeKey]: {
                confirmed: true,
              },
            },
          },
        },
        { merge: true },
      );
    }

    // console.log(noticeObj);
    // console.log(noticeSnap.data());
    // console.log(noticeKey);
  };

  useEffect(() => {
    activeNotice && getContentAndUser();
  }, [activeNotice, getContentAndUser]);

  const onContentBox = async () => {
    try {
      let contentDoc;
      if (noticeData.category === "commentLikes") {
        contentDoc = doc(dbService(), "contents", contentId);
      } else {
        contentDoc = doc(dbService(), "contents", secondId);
      }

      const contentSnap = await getDoc(contentDoc);

      const dbUser = await getDoc(
        doc(dbService(), "users", contentSnap.data().creatorId),
      );

      const id = contentSnap.id;
      const creatorId = contentSnap.data().creatorId;
      const attachmentUrl = contentSnap.data().attachmentUrl;
      // contentAction(contentList)에서도 text 넣어줘야함
      const text = contentSnap.data().text;
      const creatorDisplayName = dbUser.data().displayName;
      const creatorAttachmentUrl = dbUser.data().attachmentUrl;

      const contentObj = {
        id,
        creatorId,
        attachmentUrl,
        text,
        creatorDisplayName,
        creatorAttachmentUrl,
      };

      dispatch(boxActions.onContentBox(contentObj));
      onConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotificationStyle className="notice" confirm={noticeData.confirmed}>
      <div className="noticeProfileImage notice">
        {contentObj.creatorAttachmentUrl && !imgError ? (
          <img
            src={contentObj.creatorAttachmentUrl}
            width="36"
            height="36"
            alt="contentUserImage"
            onError={onError}
          />
        ) : (
          <FontAwesomeIcon id="profileicon" icon={faUser} />
        )}
      </div>
      {/* <div className="noticeTextWrap notice"> */}
      {/* <Link
        to="/profile"
        className="noticeTextWrap notice"
        onClick={offNotification}
      > */}
      <button className="contentBoxBtn" onClick={onContentBox}>
        <span className="notice">
          "{contentText}"{" "}
          {noticeData.category === "commentLikes" ? "댓글" : "게시글"}
          {noticeData.category === "contentComments" ? "에 " : "을 "}
        </span>
        <span className="notice">
          "{contentObj.creatorDisplayName}"님이
          {noticeData.category === "contentComments"
            ? " 댓글을 남겼습니다"
            : " 좋아합니다"}
        </span>
      </button>
      {/* </Link> */}
      {/* <div className="noticeBtnWrap"> */}
      <button className="notice confirm" onClick={onConfirm}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      {/* <button className="delete">삭제</button> */}
      {/* </div> */}
    </NotificationStyle>
  );
};

export default Notification;
