import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, doc, updateDoc, arrayRemove, deleteDoc } from "fbase";
import CommentContentStyle from "styles/CommentContentStyle";
import CommentActions from "./CommentActions";

const CommentContent = ({
  commentObj,
  sweetObj,
  isOwner,
  onCommentEditing,
  commentName,
}) => {
  const onDeleteComment = async () => {
    const ok = window.confirm("Are you sure you want to delete this comment?");
    if (ok) {
      try {
        // setTimeout(async () => {
        const d = doc(dbService(), "sweets", `${sweetObj.id}`);
        await updateDoc(d, { comments: arrayRemove(commentObj.id) });

        const commentDoc = doc(dbService(), "comments", `${commentObj.id}`);
        await deleteDoc(commentDoc);
        // }, 250);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <CommentContentStyle>
      <div className="commentHeader">
        <span className="commentUserName">{commentName}</span>
        {isOwner && (
          <div className="commentEditAndDelete">
            <button className="commentEdit" onClick={onCommentEditing}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className="commentDelete" onClick={onDeleteComment}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>

      <p className="commentText">{commentObj.text}</p>

      <CommentActions commentObj={commentObj} />
    </CommentContentStyle>
  );
};

export default CommentContent;
