import React from "react";
import { dbService, doc, onSnapshot, getDoc } from "fbase";
import { useEffect, useRef, useState } from "react";
import NotificationContainerStyle from "styles/header/nav/notice/NotificationContainerStyle";
import Notification from "./Notification";

const NotificationContainer = ({ userObj, activeNotice, onNewNotice }) => {
  const [confirmNotice, setConfirmNotice] = useState([]);
  const [unConfirmNotice, setUnConfirmNotice] = useState([]);
  const [noticeType, setNoticeType] = useState("all");
  const [ulSize, setUlSize] = useState(0);
  const ulRef = useRef();

  useEffect(() => {
    const noticeDoc = doc(dbService(), "notifications", userObj.uid);
    onSnapshot(noticeDoc, (snapshot) => {
      setConfirmNotice([]);
      setUnConfirmNotice([]);
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

      setConfirmNotice([...conResult]);
      setUnConfirmNotice([...unConResult]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUlSize(ulRef.current.clientHeight);
    // allConfirm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNotice, noticeType]);

  const onNoticeType = ({ target: { name } }) => {
    setNoticeType(name);
  };

  const allConfirm = async () => {
    // follower notice??? ??????????????????..
    const noticeDoc = doc(dbService(), "notifications", userObj.uid);
    const noticeSnap = await getDoc(noticeDoc);
    Object.entries(noticeSnap.data()).forEach(([noticeKey, noticeValue]) => {
      if (noticeKey === "follower") {
        Object.keys(noticeValue).forEach((followerKey) => {
          console.log(`${noticeKey} > ${followerKey} > confirmed`);
        });
      } else {
        // noticeKey
        Object.entries(noticeValue).forEach(([categoryKey, categoryValue]) => {
          // console.log(categoryKey, categoryValue);
          Object.keys(categoryValue).forEach((lastKey) => {
            console.log(
              `${noticeKey} > ${categoryKey} > ${lastKey} > confirmed`,
            );
          });
        });
      }
    });

    // ????????? ????????? ??? ????????? false????????? ??? ????????? Notification.js??? onConfirm??? ?????? ??? ??? ????????? ????????

    // unConfirmNotice??? ??????????????? ??????????
    // if (noticeData.category === "commentLikes") {
    //   await setDoc(
    //     noticeDoc,
    //     {
    //       [contentId]: {
    //         [noticeData.category]: {
    //           [secondId]: {
    //             [noticeKey]: {
    //               confirmed: true,
    //             },
    //           },
    //         },
    //       },
    //     },
    //     { merge: true },
    //   );
    // } else if (
    //   noticeData.category === "contentLikes" ||
    //   noticeData.category === "contentComments"
    // ) {
    //   await setDoc(
    //     noticeDoc,
    //     {
    //       [secondId]: {
    //         [noticeData.category]: {
    //           [noticeKey]: {
    //             confirmed: true,
    //           },
    //         },
    //       },
    //     },
    //     { merge: true },
    //   );
    // } else if (noticeData.category === "follower") {
    //   await setDoc(
    //     noticeDoc,
    //     {
    //       follower: {
    //         [userId]: {
    //           confirmed: true,
    //         },
    //       },
    //     },
    //     { merge: true },
    //   );
    // }
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
            {/* ?????? ????????? ??????? */}
            {/* ????????? ?????? */}
            <button
              id="allNotice"
              className={`notice ${noticeType === "all" ? "active" : ""}`}
              name="all"
              onClick={onNoticeType}
            >
              ?????? ??????
            </button>
            <button
              id="newNotice"
              className={`notice ${noticeType === "new" ? "active" : ""}`}
              name="new"
              onClick={onNoticeType}
            >
              ??? ??????
            </button>
            <button
              id="confirmNotice"
              className={`notice ${noticeType === "confirm" ? "active" : ""}`}
              name="confirm"
              onClick={onNoticeType}
            >
              ????????? ??????
            </button>
          </div>
          {/* <div id="noticeAction" className="notice">
            <button id="allConfirm" className="notice">
              ?????? ??????
            </button>
            <button id="allDelete" className="notice">
              ?????? ??????
            </button>
          </div> */}
        </div>

        <div
          id="noticeDropdown"
          className={`notice ${activeNotice ? "dropdown" : "dropup"}`}
        >
          <ul id="notificationList" className="notice" ref={ulRef}>
            {(noticeType === "all" &&
              !(unConfirmNotice.concat(confirmNotice)?.length > 0)) ||
              (noticeType === "new" && !(unConfirmNotice?.length > 0)) ||
              (noticeType === "confirm" && !(confirmNotice?.length > 0) ? (
                <p id="noNotice" className="notice">
                  ?????? ????????? ?????????????
                </p>
              ) : (
                (noticeType === "all"
                  ? unConfirmNotice.concat(confirmNotice)
                  : noticeType === "new"
                  ? unConfirmNotice
                  : confirmNotice
                ).map((notice) => (
                  <Notification
                    key={notice[0]}
                    noticeObj={notice}
                    activeNotice={activeNotice}
                  />
                ))
              ))}
            {/* {unConfirmNotice.length + confirmNotice.length ? (
              (noticeType === "all"
                ? unConfirmNotice.concat(confirmNotice)
                : noticeType === "new"
                ? unConfirmNotice
                : confirmNotice
              ).map((notice) => (
                <Notification
                  key={notice[0]}
                  noticeObj={notice}
                  activeNotice={activeNotice}
                />
              ))
            ) : (
              <p id="noNotice" className="notice">
                ?????? ????????? ?????????????
              </p>
            )} */}
          </ul>
        </div>
      </div>
    </NotificationContainerStyle>
  );
};

export default React.memo(NotificationContainer);
