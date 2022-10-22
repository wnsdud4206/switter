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
  updateDoc,
  deleteField,
} from "fbase";
import { useEffect, useState } from "react";

const CommentActions = ({ commentObj, sweetObj }) => {
  const [commentLikeCount, setCommentLikeCount] = useState([]);
  const [currentUserCommentLike, setCurrentUserCommentLike] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService(), "notifications"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs[0].data());
      // eslint-disable-next-line no-unused-vars
      snapshot.docs.forEach((doc) => {
        if (doc.id === sweetObj.id) {
          /* --------------20221022------------------ */
          if (
            doc.data().commentLikes !== undefined &&
            doc.data().commentLikes !== null
          ) {
            const likes =
              Object.keys(doc.data()?.commentLikes[commentObj.id]) || []; // array로
            console.log(likes);
            const userLike = likes.includes(authService().currentUser.uid);

            setCommentLikeCount(likes);
            setCurrentUserCommentLike(userLike);
            /* ------------------------------ */
            
            // const likes = doc.data().likes || {};
            // // console.log(like)  // 없으면 undefined 반환
            // setCommentLikeCount(Object.keys(likes).length);

            // if (likes !== undefined) {
            //   const userLike = Object.keys(likes).includes(
            //     authService().currentUser.uid,
            //   );
            //   setCurrentUserCommentLike(userLike);
            // }
            return;
          }
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeToggle = async () => {
    try {
      const { uid } = authService().currentUser;

      const d = doc(dbService(), "notifications", `${sweetObj.id}`);

      if (!currentUserCommentLike) {
        await setDoc(
          d,
          {
            commentLikes: {
              [commentObj.id]: {
                [uid]: { confirmed: false, lastUpdate: Date.now() },
              },
            },
          },
          { merge: true },
        );
        // await updateDoc(
        //   d,
        //   {
        //     likes: { [uid]: { confirmed: false, lastUpdate: Date.now() } },
        //   },
        //   { merge: true },
        // );

        // notification(
        //   "ADD",
        //   "commentLikes",
        //   commentObj.creatorId,
        //   sweetObj.id,
        //   uid,
        //   commentObj.id,
        // );
      } else if (currentUserCommentLike) {
        await setDoc(
          d,
          {
            commentLikes: {
              [commentObj.id]: {
                [uid]: deleteField(),
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
