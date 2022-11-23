import { dbService, doc, onSnapshot } from "fbase";
import { useEffect, useRef, useState } from "react";
import NotificationContainerStyle from "styles/header/nav/notice/NotificationContainerStyle";
import Notification from "./Notification";

const NotificationContainer = ({ userObj, activeNotice, offNotification }) => {
  const [noticeArr, setNoticeArr] = useState([]);
  const [ulSize, setUlSize] = useState(0);
  const ulRef = useRef();

  useEffect(() => {
    const noticeDoc = doc(dbService(), "notifications", userObj.uid);
    onSnapshot(noticeDoc, (snapshot) => {
      // 각 contentComments, contentLikes, commentLikes 안의 모든 갯수를 더한 만큼 출력
      setNoticeArr([]);
      let data = snapshot.data();
      let confirmAll = [];
      let unConfirmAll = [];
      for (let docValue of Object.values(data)) {
        // console.log(docValue);
        // console.log(Object.entries(docValue));
        // category
        for (let [categoryKey, categoryValue] of Object.entries(docValue)) {
          if (Object.keys(categoryValue).length === 0) continue;
          if (categoryKey === "commentLikes") {
            for (let commentValue of Object.values(categoryValue)) {
              if (Object.keys(commentValue).length === 0) continue;
              for (let commentObj of Object.entries(commentValue)) {
                commentObj[1].confirmed
                  ? (confirmAll = [...confirmAll, commentObj])
                  : (unConfirmAll = [...unConfirmAll, commentObj]);
              }
            }
          } else {
            for (let contentObj of Object.entries(categoryValue)) {
              contentObj[1].confirmed
                ? (confirmAll = [...confirmAll, contentObj])
                : (unConfirmAll = [...unConfirmAll, contentObj]);
            }
          }
        }
      }

      const conResult = confirmAll.sort((a, b) => {
        if (a[1].lastUpdate < b[1].lastUpdate) return 1;
        if (a[1].lastUpdate > b[1].lastUpdate) return -1;
        return 0;
      });
      const unConResult = unConfirmAll.sort((a, b) => {
        if (a[1].lastUpdate < b[1].lastUpdate) return 1;
        if (a[1].lastUpdate > b[1].lastUpdate) return -1;
        return 0;
      });

      setNoticeArr([...unConResult, ...conResult]);
    });

    setUlSize(ulRef.current.clientHeight);
  }, [activeNotice]);

  return (
    <NotificationContainerStyle
      id="notificationContainer"
      className={`notice ${activeNotice ? "open" : "close"}`}
      ulSize={ulSize}
    >
      <div id="noticeDropdownWrap">
        <div id="noticeHeader">
          <div id="categoryTab">
            {/* 친구 새글도 추가? */}
            <button id="contentNotice">contents</button>
            <button id="commentNotice">Comments</button>
          </div>
          <div id="noticeAction">
            <button id="allConfirm">모두 확인</button>
            <button id="allDelete">모두 삭제</button>
          </div>
        </div>

        <div
          id="noticeDropdown"
          className={`notice ${activeNotice ? "dropdown" : "dropup"}`}
        >
          <ul id="notificationList" className="notice" ref={ulRef}>
            {noticeArr.length ? ( // key도 같이 가져와야 하는데..
              noticeArr.map((notice) => (
                <Notification
                  key={notice[0]}
                  noticeObj={notice}
                  offNotification={offNotification}
                  activeNotice={activeNotice}
                />
              ))
            ) : (
              <p id="noNotice" className="notice">
                아직 알림이 없어요😪
              </p>
            )}
          </ul>
        </div>
      </div>
    </NotificationContainerStyle>
  );
};

export default NotificationContainer;
