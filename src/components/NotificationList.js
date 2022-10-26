import {
  dbService,
  doc,
  getDoc,
  query,
  collection,
  where,
  onSnapshot,
} from "fbase";
import { useEffect, useState } from "react";
import NotificationListStyle from "styles/NotificationListStyle";
import Notification from "./Notification";

const NotificationList = ({ userObj }) => {
  const [unConfirm, setUnConfirm] = useState({});

  const getNotification = async () => {
    // const d = doc(dbService(), "notifications", "noData");  // undefined
    const d = doc(dbService(), "notifications", userObj.uid);
    onSnapshot(d, (snapshot) => {
      // 각 sweetComments, sweetLikes, commentLikes 안의 모든 갯수를 더한 만큼 출력
      let data = snapshot.data() || {};
      // console.log(Object.entries(data));
      // Object.entries(data).map(([key, value]) => {
      //   console.log(key);
      //   console.log(value);
      // })

      // .sort((a, b) => {
      //   if (a.createdAt < b.createdAt) return 1;
      //   if (a.createdAt > b.createdAt) return -1;
      //   return 0;
      // })
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
  // let test = {a: {q: 1, w: 2, e: 3}, b: {r: 4, t: 5, y: 6}, c: {u: 7, i: 8, o: 9}};
  // for (let [key, value] of Object.entries(test)) {
  //   console.log(key);
  //   for (let [tKey, tValue] of Object.entries(value)) {
  //       console.log(tKey);
  //       console.log(tValue);
  //   }
  // }

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <NotificationListStyle id="notificationList">
      {/* map */}
      {/* {true && <li>notification item</li>} */}
      {/* noticeBtn의 옵션은 알림확인&알림삭제 */}
      {/* <li>
        <div className="noticeProfileImage">image</div>
        <div className="noticeTextWrap">
          <span>
            <b>n</b>명이 <b>/게시글&댓글/</b>에
          </span>
          <span>
            <b>/좋아요&댓글/</b>를 /눌렀&달았/습니다.
          </span>
        </div>
        <div className="noticeBtn">Button</div>
      </li> */}

      {/* {unConfirm.length && // key도 같이 가져와야 하는데..
        unConfirm.map((con) => {
          return (
            <Notification
              key={con[0]}
              category={con[1].category}
              confirmed={con[1].confirmed}
            />
          );
        })} */}
    </NotificationListStyle>
  );
};

export default NotificationList;
