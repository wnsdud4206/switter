import { dbService, doc, onSnapshot } from "fbase";
import { useEffect, useRef, useState } from "react";
import NotificationContainerStyle from "styles/nav/notice/NotificationContainerStyle";
import Notification from "./Notification";

const NotificationContainer = ({ userObj, activeNotice }) => {
  const [unConfirm, setUnConfirm] = useState({});
  const [ulSize, setUlSize] = useState(0);
  const ulRef = useRef();

  const getNotification = async () => {
    // const d = doc(dbService(), "notifications", "noData");  // undefined
    const d = doc(dbService(), "notifications", userObj.uid);
    onSnapshot(d, (snapshot) => {
      // 각 sweetComments, sweetLikes, commentLikes 안의 모든 갯수를 더한 만큼 출력
      let data = snapshot.data() || {};
      let unConfirmAll = {};
      for (let docValue of Object.values(data)) {
        // category
        for (let [categoryKey, categoryValue] of Object.entries(docValue)) {
          if (categoryKey === "commentLikes") {
            for (let commentValue of Object.values(categoryValue)) {
              Object.assign(unConfirmAll, commentValue);
            }
          } else {
            Object.assign(unConfirmAll, categoryValue);
          }
        }
      }

      const result = Object.entries(unConfirmAll).sort((a, b) => {
        if (a[1].lastUpdate < b[1].lastUpdate) return 1;
        if (a[1].lastUpdate > b[1].lastUpdate) return -1;
        return 0;
      });

      setUnConfirm(result);
    });
  };

  useEffect(() => {
    getNotification();

    // console.log(ulRef.current.clientHeight);
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
            <button id="sweetNotice">Sweets</button>
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
            {unConfirm.length ? ( // key도 같이 가져와야 하는데..
              unConfirm.map((con) => {
                return <Notification key={con[0]} noticeObj={con} />;
              })
            ) : (
              <p id="noNotice" className="notice">
                알림이 없어요!
              </p>
            )}
          </ul>
        </div>
      </div>
    </NotificationContainerStyle>
  );
};

export default NotificationContainer;
