import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, doc, getDoc } from "fbase";
import { useEffect, useState } from "react";
import CommentStyle from "styles/CommentStyle";
import CommentContent from "./CommentContent";
import CommentEdit from "./CommentEdit";

// 20221011, comment 를 edit과 content로 분리하기

const Comment = ({
  commentObj,
  isOwner,
  userObj,
  sweetObj,
  onlyCommentEditing,
  onOnlyCommentEditing,
  onCommentEditResizeToggle,
  // offCommentEditResize,
}) => {
  const [commentName, setCommentName] = useState("");
  const [commentAttachmentUrl, setCommentAttachmentUrl] = useState("");
  const [commentEditing, setCommentEditing] = useState(false);

  const getCommentUser = async () => {
    const d = doc(dbService(), "users", `${commentObj.creatorId}`);
    const docSnap = await getDoc(d);
    setCommentName(docSnap.data().displayName);
    setCommentAttachmentUrl(docSnap.data().attachmentUrl);
  };

  useEffect(() => {
    getCommentUser();
  });

  useEffect(() => {
    if (onlyCommentEditing !== commentObj.id && commentEditing) {
      setCommentEditing(false);
      onCommentEditResizeToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyCommentEditing]);

  const onCommentEditing = () => {
    onOnlyCommentEditing(commentObj.id);
    setCommentEditing(true);
    onCommentEditResizeToggle();
  };
  const offCommentEditing = () => {
    setCommentEditing(false);
    onOnlyCommentEditing("");
    onCommentEditResizeToggle();
  };

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
        <CommentEdit
          commentObj={commentObj}
          commentName={commentName}
          offCommentEditing={offCommentEditing}
          commentEditing={commentEditing}
        />
      ) : (
        <CommentContent
          userObj={userObj}
          commentObj={commentObj}
          sweetObj={sweetObj}
          isOwner={isOwner}
          onCommentEditing={onCommentEditing}
          commentName={commentName}
        />
      )}
    </CommentStyle>
  );
};

export default Comment;
