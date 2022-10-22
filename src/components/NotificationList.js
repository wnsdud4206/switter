import {
  dbService,
  authService,
  onSnapshot,
  doc,
  collection,
  query,
  where,
} from "fbase";
import { useEffect, useState } from "react";
import NotificationListStyle from "styles/NotificationListStyle";

const NotificationList = ({ notice }) => {
  const [unConfirm, setUnConfirm] = useState({});

  useEffect(() => {
    // sweets
    const sweetQuery = query(
      collection(dbService(), "sweets"),
      where("creatorId", "==", authService().currentUser.uid),
    );

    let data = {};
    onSnapshot(sweetQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        // console.log("sweetLikes: ", doc.data().likes || {});
        // console.log("sweetComments: ", doc.data().comments || {});

        if (doc.data().likes !== {} && doc.data().likes !== undefined) {
          // confirmed가 false것을 또 필터링해서
          // console.log(doc.id);
          // console.log("sweetLikes: ", doc.data().likes);

          data[doc.id] = {
            ...(data[doc.id] || {}),
            sweetLikes: {
              ...(data[doc.id]?.sweetLikes || {}),
              ...doc.data().likes,
            },
          };
        }
        if (doc.data().comments !== {} && doc.data().comments !== undefined) {
          // console.log("sweetComments: ", doc.data().comments);

          data[doc.id] = {
            ...(data[doc.id] || {}),
            sweetComments: {
              ...(data[doc.id]?.sweetComments || {}),
              ...doc.data().comments,
            },
          };
        }

        setUnConfirm(data);
      });
      // console.log(data);
    });
    console.log(unConfirm);

    // comments
    const commentQuery = query(
      collection(dbService(), "comments"),
      where("creatorId", "==", authService().currentUser.uid),
    );

    onSnapshot(commentQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        // console.log("commentLikes: ", doc.data().likes || {});
        if (doc.data().likes !== {} && doc.data().likes !== undefined) {
          // console.log("commentLikes: ", doc.data().likes);
        }
      });
    });
  }, []);

  // useEffect(() => {
  //   for (const [key, value] of Object.entries(unConfirm || {})) {
  //     // console.log(key, value);
  //     for (const [sweetKey, sweetValue] of Object.entries(value || {})) {
  //       // console.log(sweetKey, sweetValue);
  //     }
  //   }
  // }, []);

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
