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

const NotificationList = ({ userObj }) => {
  const [unConfirm, setUnConfirm] = useState({});

  const getNotification = async () => {
    // const d = doc(dbService(), "notifications", "noData");  // undefined
    const d = doc(dbService(), "notifications", userObj.uid);
    onSnapshot(d, (snapshot) => {
      console.log(snapshot.data());
      // console.log(snapshot.data()[0]?.sweetComments);
      // console.log(snapshot.data()[0]?.sweetLikes);
    });
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <NotificationListStyle id="notificationList">
      {/* map */}
      {/* {true && <li>notification item</li>} */}
      {/* noticeBtn의 옵션은 알림확인&알림삭제 */}
      <li>
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
      </li>

      {/* {comments.length ? (
        comments
          // .sort((a, b) => {
          //   if (a.createdAt < b.createdAt) return -1;
          //   if (a.createdAt > b.createdAt) return 1;
          //   return 0;
          // })
          .map((comment) => (
            <li>
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
            </li>
          ))
      ) : (
        <></>
      )} */}
    </NotificationListStyle>
  );
};

export default NotificationList;
