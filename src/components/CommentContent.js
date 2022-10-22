import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dbService,
  doc,
  setDoc,
  deleteField,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "fbase";
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
        const sweetDoc = doc(dbService(), "sweets", `${sweetObj.id}`);
        await updateDoc(sweetDoc, { comments: arrayRemove(commentObj.id) });

        const noticeDoc = doc(dbService(), "notifications", `${sweetObj.id}`);
        await setDoc(
          noticeDoc,
          {
            sweetComments: { [commentObj.id]: deleteField() },
            commentLikes: {
              [commentObj.id]: deleteField(),
            },
          },
          { merge: true },
        );

        const commentDoc = doc(dbService(), "comments", `${commentObj.id}`);
        await deleteDoc(commentDoc);

        // const { uid } = authService().currentUser;
        // notification(
        //   "REMOVE",
        //   "sweetComments",
        //   commentObj.creatorId,
        //   sweetObj.id,
        //   uid,
        //   commentObj.id,
        // );
        // notification(
        //   "REMOVE",
        //   "sweetComments",
        //   sweetObj.creatorId,
        //   sweetObj.id,
        //   commentObj.id,
        // );
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

      <CommentActions commentObj={commentObj} sweetObj={sweetObj} />
    </CommentContentStyle>
  );
};

export default CommentContent;
