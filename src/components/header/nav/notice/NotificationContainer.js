import { dbService, doc, onSnapshot } from "fbase";
import { useEffect, useRef, useState } from "react";
import NotificationContainerStyle from "styles/header/nav/notice/NotificationContainerStyle";
import Notification from "./Notification";

const NotificationContainer = ({ userObj, activeNotice, onNewNotice }) => {
  const [noticeArr, setNoticeArr] = useState([]);
  // all, new, confirm
  const [noticeType, setNoticeType] = useState("all");
  const [ulSize, setUlSize] = useState(0);
  const ulRef = useRef();

  useEffect(() => {
    // content, comments, users
    // contents, contents.likes, comments, comments.likes, users.follow, users.follower
    // contents.comments, contents.likes, comments.likes, users.follower
    const noticeDoc = doc(dbService(), "notifications", userObj.uid);
    onSnapshot(noticeDoc, (snapshot) => {
      setNoticeArr([]);
      let data = snapshot.data();
      let confirmAll = [];
      let unConfirmAll = [];

      if (!data) return;
      for (let [docKey, docValue] of Object.entries(data)) {
        if (docKey === "follower") {
          for (let followerObj of Object.entries(docValue)) {
            followerObj[1].confirmed
              ? (confirmAll = [...confirmAll, followerObj])
              : (unConfirmAll = [...unConfirmAll, followerObj]);
          }
        } else {
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
            } else if (
              categoryKey === "contentComments" ||
              categoryKey === "contentLikes"
            ) {
              for (let contentObj of Object.entries(categoryValue)) {
                contentObj[1].confirmed
                  ? (confirmAll = [...confirmAll, contentObj])
                  : (unConfirmAll = [...unConfirmAll, contentObj]);
              }
            }
          }
        }
      }

      onNewNotice(confirmAll === 0 ? false : true);

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

      // console.log(conResult);
      // console.log(unConResult);

      setNoticeArr([...unConResult, ...conResult]);
    });

    setUlSize(ulRef.current.clientHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNotice]);

  const onNoticeType = ({ target: { name } }) => {
    setNoticeType(name);
  };

  return (
    <NotificationContainerStyle
      id="notificationContainer"
      className={`notice ${activeNotice ? "open" : "close"}`}
      ulSize={ulSize}
    >
      <div id="noticeDropdownWrap" className="notice">
        <div id="noticeHeader" className="notice">
          <div id="categoryTab" className="notice">
            {/* 친구 새글도 추가? */}
            {/* 트리거 추가 */}
            <button
              id="allNotice"
              className={`notice ${noticeType === "all" ? "active" : ""}`}
              name="all"
              onClick={onNoticeType}
            >
              모든 알림
            </button>
            <button
              id="newNotice"
              className={`notice ${noticeType === "new" ? "active" : ""}`}
              name="new"
              onClick={onNoticeType}
            >
              새 알림
            </button>
            <button
              id="confirmNotice"
              className={`notice ${noticeType === "confirm" ? "active" : ""}`}
              name="confirm"
              onClick={onNoticeType}
            >
              확인한 알림
            </button>
          </div>
          <div id="noticeAction" className="notice">
            <button id="allConfirm" className="notice">
              모두 확인
            </button>
            <button id="allDelete" className="notice">
              모두 삭제
            </button>
          </div>
        </div>

        <div
          id="noticeDropdown"
          className={`notice ${activeNotice ? "dropdown" : "dropup"}`}
        >
          <ul id="notificationList" className="notice" ref={ulRef}>
            {noticeArr.length ? (
              noticeArr.map((notice) => {
                if (noticeType === "all") {
                  return (
                    <Notification
                      key={notice[0]}
                      noticeObj={notice}
                      activeNotice={activeNotice}
                    />
                  );
                } else if (noticeType === "new") {
                  if (!notice[1].confirmed) {
                    return (
                      <Notification
                        key={notice[0]}
                        noticeObj={notice}
                        activeNotice={activeNotice}
                      />
                    );
                  }
                } else if (noticeType === "confirm") {
                  if (notice[1].confirmed) {
                    return (
                      <Notification
                        key={notice[0]}
                        noticeObj={notice}
                        activeNotice={activeNotice}
                      />
                    );
                  }
                }
              })
            ) : (
              // noticeArr.map((notice) => (
              //   <Notification
              //     key={notice[0]}
              //     noticeObj={notice}
              //     activeNotice={activeNotice}
              //   />
              // ))
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
