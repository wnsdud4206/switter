const Comment = ({ commentObj, isOwner, userObj }) => {
  return (
    <div>
      {/* displayName 나중에 sweet처럼 가져오는 걸로 바꾸기 */}
      <span>{commentObj.displayName}</span>
      {isOwner && <button>edit&delete</button>}
      <p>{commentObj.text}</p>
    </div>
  );
};

export default Comment;
