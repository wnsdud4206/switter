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
  setDoc,
  deleteField,
} from "fbase";
import { useEffect, useState } from "react";

const CommentActions = ({ userObj, commentObj, sweetObj }) => {
  const [commentLikeCount, setCommentLikeCount] = useState([]);
  const [currentUserCommentLike, setCurrentUserCommentLike] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService(), "notifications"));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (
          doc.id === commentObj.creatorId &&
          doc.data()[sweetObj.id]?.commentLikes !== undefined
        ) {
          const likes = Object.keys(
            doc.data()[sweetObj.id]?.commentLikes[commentObj.id] || {},
          ); // array로

          // const userLike = likes.includes(authService().currentUser.uid);
          const userLike = likes.includes(commentObj.id + "/" + userObj?.uid);

          setCommentLikeCount(likes);
          setCurrentUserCommentLike(userLike);
          return;
        }
      });
      // }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeToggle = async () => {
    try {
      const { uid } = authService().currentUser;

      // commentObj.id X, 지울 때 복잡해짐, 한 곳에 넣고 where 같은 걸로 필터링해서 commentlikes는 따로 가져와야 할듯?? - XXX
      // commentLikes는 따로 넣고 찾아서 지우는게 나을듯
      const d = doc(dbService(), "notifications", `${commentObj.creatorId}`);

      if (!currentUserCommentLike) {
        await setDoc(
          d,
          {
            [sweetObj.id]: {
              commentLikes: {
                [commentObj.id]: {
                  [commentObj.id + "/" + uid]: {
                    confirmed: false,
                    lastUpdate: Date.now(),
                    category: "commentLikes"
                  },
                },
              },
            },
          },
          { merge: true },
        );
      } else if (currentUserCommentLike) {
        await setDoc(
          d,
          {
            [sweetObj.id]: {
              commentLikes: {
                [commentObj.id]: {
                  [commentObj.id + "/" + uid]: deleteField(),
                },
              },
            },
          },
          { merge: true },
        );

        // notification(
        //   "REMOVE",
        //   "commentLikes",
        //   commentObj.creatorId,
        //   sweetObj.id,
        //   uid,
        //   commentObj.id,
        // );
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

      <span className="commentLikeCounter">{commentLikeCount.length}</span>
    </CommentActionsStyle>
  );
};

export default CommentActions;
