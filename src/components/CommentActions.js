import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentActionsStyle from "styles/CommentActionsStyle";
import {
  query,
  collection,
  dbService,
  onSnapshot,
  authService,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "fbase";
import { useEffect, useState } from "react";
import notification from "utils/notification";

const CommentActions = ({ commentObj }) => {
  const [commentLikeCount, setCommentLikeCount] = useState(commentObj.like);
  const [currentUserCommentLike, setCurrentUserCommentLike] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService(), "comments"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs[0].data());
      // eslint-disable-next-line no-unused-vars
      const sweetArr = snapshot.docs.forEach((doc) => {
        if (doc.id === commentObj.id) {
          const like = doc.data().like;
          // console.log(like)  // 없으면 undefined 반환
          setCommentLikeCount(like);

          if (like !== undefined) {
            const userLike = like.includes(authService().currentUser.uid);
            setCurrentUserCommentLike(userLike);
          }
          return;
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeToggle = async () => {
    try {
      const { uid } = authService().currentUser;

      const d = doc(dbService(), "comments", `${commentObj.id}`);

      if (!currentUserCommentLike) {
        await updateDoc(d, { like: arrayUnion(uid) });

        notification(
          "ADD",
          "commentLikes",
          commentObj.creatorId,
          commentObj.id,
          uid,
        );
      } else if (currentUserCommentLike) {
        await updateDoc(d, { like: arrayRemove(uid) });
        notification(
          "REMOVE",
          "commentLikes",
          commentObj.creatorId,
          commentObj.id,
          uid,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentActionsStyle>
      <button className="commentLikeToggle" onClick={onLikeToggle}>
        {currentUserCommentLike ? (
          <FontAwesomeIcon className="commentLike" icon={like} />
        ) : (
          <FontAwesomeIcon className="commentNotLike" icon={faRegHeart} />
        )}
      </button>

      <span className="commentLikeCounter">
        {commentLikeCount && commentLikeCount.length}
      </span>
    </CommentActionsStyle>
  );
};

export default CommentActions;
