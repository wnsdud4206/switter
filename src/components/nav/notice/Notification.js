import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, dbService, doc, getDoc } from "fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationStyle from "styles/nav/notice/NotificationStyle";

const Notification = ({ noticeObj, offNotification }) => {
  const [noticeKey, noticeData] = noticeObj;
  const [contentText, getContentText] = useState("");
  const [userName, getUserName] = useState("");
  const [userImage, getUserImage] = useState("");
  const [imgError, setImgError] = useState(false);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const getContentAndUser = async () => {
    // const [contentId, userId] = noticeKey.split("/");

    let sweetId, contentId, userId;
    let collection;
    if (noticeData.category === "commentLikes") {
      [sweetId, contentId, userId] = noticeKey.split("/");
      collection = "comments";
    } else {
      [contentId, userId] = noticeKey.split("/");
      collection = "sweets";
    }

    // getContent
    const contentDoc = doc(dbService(), collection, contentId);

    const contentGet = await getDoc(contentDoc);

    let text;
    if (contentGet.data().text.length > 10) {
      text = `${contentGet.data().text.slice(0, 10)}...`;
    } else {
      text = contentGet.data().text;
    }
    getContentText(text);

    // getUser
    let userDoc;
    if (noticeData.category === "sweetComments") {
      const commentDoc = doc(dbService(), "comments", userId);
      const commentGet = await getDoc(commentDoc);

      userDoc = doc(dbService(), "users", commentGet.data().creatorId);
    } else {
      userDoc = doc(dbService(), "users", userId);
    }

    const userGet = await getDoc(userDoc);

    const name = userGet.data().displayName;
    getUserName(name);
    const image = userGet.data().attachmentUrl;
    getUserImage(image);
  };

  const onConfirm = async () => {
    const d = doc(dbService(), "notifications", authService().currentUser.uid);
    const get = await getDoc(d);
    // console.log(get.data());

    // console.log(noticeKey);
  };

  useEffect(() => {
    getContentAndUser();
    onConfirm();
  }, []);

  return (
    <NotificationStyle className="notice">
      <div className="noticeProfileImage notice">
        {userImage && !imgError ? (
          <img
            src={userImage}
            width="50"
            height="50"
            alt="sweetUserImage"
            onError={onError}
          />
        ) : (
          <FontAwesomeIcon id="profileicon" icon={faUser} />
        )}
      </div>
      {/* <div className="noticeTextWrap notice"> */}
      <Link to="/profile" className="noticeTextWrap notice" onClick={offNotification}>
        <span className="notice">
          "{contentText}"{" "}
          {noticeData.category === "commentLikes" ? "댓글" : "게시글"}
          {noticeData.category === "sweetComments" ? "에 " : "을 "}
        </span>
        <span className="notice">
          "{userName}"님이
          {noticeData.category === "sweetComments"
            ? " 댓글을 남겼습니다."
            : " 좋아합니다."}
        </span>
      </Link>
      <div className="noticeBtnWrap">
        <button className="confirm">확인</button>
        <button className="delete">삭제</button>
      </div>
    </NotificationStyle>
  );
};

export default Notification;
