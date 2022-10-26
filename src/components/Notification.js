const Notification = ({ key, category, confirmed }) => {
  return (
    <li key={key}>
      <div className="noticeProfileImage">image</div>
      <div className="noticeTextWrap">
        <span>
          ~ {category === "commentLikes" ? "댓글" : "게시글"}
          {category === "sweetComments" ? "에 " : "을 "}
        </span>
        <span>
          ~님이
          {category === "sweetComments"
            ? " 댓글을 달았습니다."
            : " 좋아합니다."}
        </span>
      </div>
      <div className="noticeBtn">Button</div>
    </li>
  );
};

export default Notification;
