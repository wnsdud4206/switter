import { useEffect } from "react";
import NotificationListStyle from "styles/NotificationListStyle";

const NotificationList = ({ notice }) => {
  
  // useEffect(() => {
  //   console.log(notice);
  // }, [notice])
  
  return (
    <NotificationListStyle id="notificationList">
      {/* map */}
      {/* {true && <li>notification item</li>} */}
      {/* noticeBtn의 옵션은 알림확인&알림삭제 */}
      <li>
        <div className="noticeProfileImage">image</div>
        <div className="noticeTextWrap">
          <span>
            <b>nickName</b>님이 <b>/게시글&댓글/</b>에
          </span>
          <span>
            <b>/좋아요&댓글/</b>를 /눌렀&달았/습니다.
          </span>
        </div>
        <div className="noticeBtn">Button</div>
      </li>
    </NotificationListStyle>
  );
};

export default NotificationList;
