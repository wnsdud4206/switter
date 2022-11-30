import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, dbService, doc, getDoc, setDoc } from "fbase";
import { boxActions } from "reducers/contentBoxReducer";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationStyle from "styles/header/nav/notice/NotificationStyle";

const Notification = ({ noticeObj, activeNotice }) => {
  const [noticeKey, noticeData] = noticeObj;
  const [contentText, setContentText] = useState("");
  const [contentObj, setContentObj] = useState({});
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();

  let contentId, secondId, userId;
  let collection;
  // 이름을 조금 바꿔줘야 할듯 - 정확하지 않음
  if (noticeData.category === "commentLikes") {
    [contentId, secondId, userId] = noticeKey.split("/");
    collection = "comments";
  } else if (
    noticeData.category === "contentComments" ||
    noticeData.category === "contentLikes"
  ) {
    [secondId, userId] = noticeKey.split("/");
    collection = "contents";
  } else if (noticeData.category === "follower") {
    userId = noticeKey;
    collection = "users";
  }

  const onError = () => setImgError(true);

  const getContentAndUser = useCallback(async () => {
    try {
      if (noticeData.category === "follower") {
        const userDoc = doc(dbService(), collection, userId);

        const userGet = await getDoc(userDoc);

        const displayName = userGet.data().displayName;
        const attachmentUrl = userGet.data().attachmentUrl;

        setContentObj({ displayName, attachmentUrl });
      } else {
        // getContent
        const contentDoc = doc(dbService(), collection, secondId);

        const contentGet = await getDoc(contentDoc);

        // 왜 자꾸 text를 바로바로 못가져 오는 거야..
        let text;
        if (contentGet.data().text?.length > 10)
          text = `${contentGet.data().text.slice(0, 10)}...`;
        else text = contentGet.data().text;

        // getUser
        let userDoc;
        if (noticeData.category === "contentComments") {
          const commentDoc = doc(dbService(), "comments", userId);

          const commentGet = await getDoc(commentDoc);

          userDoc = doc(dbService(), "users", commentGet.data().creatorId);
        } else if (
          noticeData.category === "contentLikes" ||
          noticeData.category === "commentLikes"
        ) {
          userDoc = doc(dbService(), "users", userId);
        }

        const userGet = await getDoc(userDoc);

        const displayName = userGet.data().displayName;
        const attachmentUrl = userGet.data().attachmentUrl;

        setContentText(text);
        setContentObj({
          ...contentGet.data(),
          displayName,
          attachmentUrl,
        });
        // getContentText, getUserName, getUserImage 를 contentObj 하나로 묶어서 dispatch 하기?
      }
    } catch (error) {
      console.error(error);
    }
  }, [collection, noticeData.category, secondId, userId]);

  useEffect(() => {
    getContentAndUser();
  }, [activeNotice, getContentAndUser]);

  const onConfirm = async () => {
    const noticeDoc = doc(
      dbService(),
      "notifications",
      authService().currentUser.uid,
    );

    if (noticeData.category === "commentLikes") {
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
    } else if (
      noticeData.category === "contentLikes" ||
      noticeData.category === "contentComments"
    ) {
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
    } else if (noticeData.category === "follower") {
      await setDoc(
        noticeDoc,
        {
          follower: {
            [userId]: {
              confirmed: true,
            },
          },
        },
        { merge: true },
      );
    }
  };

  const onContentBox = async () => {
    try {
      let contentDoc;
      if (noticeData.category === "commentLikes")
        contentDoc = doc(dbService(), "contents", contentId);
      else if (
        noticeData.category === "contentComments" ||
        noticeData.category === "contentLikes"
      )
        contentDoc = doc(dbService(), "contents", secondId);

      const contentSnap = await getDoc(contentDoc);

      const dbUser = await getDoc(
        doc(dbService(), "users", contentSnap.data().creatorId),
      );

      const id = contentSnap.id;
      const creatorId = contentSnap.data().creatorId;
      const attachmentUrl = contentSnap.data().attachmentUrl;
      const text = contentSnap.data().text;
      const creatorDisplayName = dbUser.data().displayName;
      const creatorAttachmentUrl = dbUser.data().attachmentUrl;

      const content = {
        id,
        creatorId,
        attachmentUrl,
        text,
        creatorDisplayName,
        creatorAttachmentUrl,
      };

      dispatch(boxActions.onContentBox(content));
      onConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotificationStyle className="notice" confirm={noticeData.confirmed}>
      <div className="noticeProfileImage notice">
        {contentObj.attachmentUrl && !imgError ? (
          <img
            src={contentObj.attachmentUrl}
            width="36"
            height="36"
            alt="contentUserImage"
            onError={onError}
          />
        ) : (
          <FontAwesomeIcon id="profileicon" icon={faUser} />
        )}
      </div>
      {noticeData.category === "follower" ? (
        <Link
          className="moveToProfile"
          to={`/profile/${contentObj.displayName}`}
          onClick={onConfirm}
        >
          <span className="notice">
            "{contentObj.displayName}"님이 팔로우 했습니다.
          </span>
        </Link>
      ) : (
        <button className="contentBoxBtn" onClick={onContentBox}>
          <span className="notice">
            "{contentText}"{" "}
            {noticeData.category === "commentLikes" ? "댓글" : "게시글"}
            {noticeData.category === "contentComments" ? "에 " : "을 "}
          </span>
          <span className="notice">
            "{contentObj.displayName}"님이
            {noticeData.category === "contentComments"
              ? " 댓글을 남겼습니다"
              : " 좋아합니다"}
          </span>
        </button>
      )}
      <button className="notice confirm" onClick={onConfirm}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </NotificationStyle>
  );
};

export default Notification;
