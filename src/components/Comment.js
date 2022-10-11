import { faPencil, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dbService,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "fbase";
import { useEffect, useState } from "react";
import CommentStyle from "styles/CommentStyle";

// 20221011, comment 를 edit과 content로 분리하기

const Comment = ({
  commentObj,
  isOwner,
  userObj,
  sweetObj,
  onCommentEditing,
  offCommentEditing,
  commentEditing,
}) => {
  const [commentName, setCommentName] = useState("");
  const [commentAttachmentUrl, setCommentAttachmentUrl] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const getCommentUser = async () => {
    const d = doc(dbService(), "users", `${commentObj.creatorId}`);
    const docSnap = await getDoc(d);
    // console.log(docSnap.data().displayName);
    // console.log(docSnap.data().attachmentUrl);
    setCommentName(docSnap.data().displayName);
    setCommentAttachmentUrl(docSnap.data().attachmentUrl);
  };

  useEffect(() => {
    getCommentUser();
  });

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

  const onChange = ({ target: { value } }) => {
    setNewCommentText(value);
  };

  useEffect(() => {
    setNewCommentText(commentObj.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentEditing]);

  return (
    <CommentStyle>
      <div className="commentUserImage">
        {commentAttachmentUrl ? (
          <img
            src={commentAttachmentUrl}
            width="100%"
            height="100%"
            alt="commentUserImage"
          />
        ) : (
          <FontAwesomeIcon id="profileicon" icon={faUser} />
        )}
      </div>

      {commentEditing ? (
        <>
          {/* CommentEdit */}
          <div className="commentEditWrap">
            <div className="commentEditHeader">
              <span className="commentEditUserName">{commentName}</span>
              {isOwner && (
                <div className="commentEditAndDelete">
                  <button className="commentEdit" onClick={offCommentEditing}>
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button className="commentDelete" onClick={onDeleteComment}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            <input
              className="newCommentText"
              value={newCommentText}
              onChange={onChange}
              required
              autoFocus
            />
          </div>
        </>
      ) : (
        <>
          {/* CommentContent */}
          <div className="commentWrap">
            <div className="commentHeader">
              <span className="commentUserName">{commentName}</span>
              {isOwner && (
                <div className="commentEditAndDelete">
                  {/* <button className="commentEdit" onClick={onCommentEditing}> */}
                  <button className="commentEdit">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button className="commentDelete" onClick={onDeleteComment}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            <p className="commentText">{commentObj.text}</p>

            <button className="commentLike">like btn</button>
          </div>
        </>
      )}
    </CommentStyle>
  );
};

export default Comment;
