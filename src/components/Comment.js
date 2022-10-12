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
  onCommentEditResize,
  offCommentEditResize,
}) => {
  const [commentName, setCommentName] = useState("");
  const [commentAttachmentUrl, setCommentAttachmentUrl] = useState("");
  const [commentEditing, setCommentEditing] = useState(false);

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

  const onCommentEditing = () => {
    setCommentEditing(true);
    onCommentEditResize();
  };
  const offCommentEditing = () => {
    setCommentEditing(false);
    offCommentEditResize();
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
