import styled from "styled-components";
import {
  authService,
  dbService,
  doc,
  getDocs,
  setDoc,
  query,
  collection,
  deleteDoc,
  deleteField,
  onSnapshot,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

const ContentBoxCommentActionsStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    outline: none;
    background: none;
    border: none;
    padding: 0;

    color: var(--sub-color);

    cursor: pointer;
    
    svg {
      font-size: 16px;

      &.commentLike {
        color: #ff6633;
      }

      &.commentNotLike {
        color: white;
      }
    }
  }
`;

const ContentBoxCommentActions = ({
  userObj,
  content,
  comment,
  getComments,
}) => {
  const [currentUserCommentLike, setCurrentUserCommentLike] = useState(false);

  const onDeleteComment = async () => {
    try {
      const ok = window.confirm(
        "Are you sure you want to delete this comment?",
      );
      if (ok) {
        const commentDoc = doc(dbService(), "comments", `${comment.id}`);
        await deleteDoc(commentDoc);

        const noticeQuery = query(collection(dbService(), "notifications"));
        const noticeDocs = await getDocs(noticeQuery);
        noticeDocs.docs.forEach(async (noticeDoc) => {
          if (Object.keys(noticeDoc.data()).includes(content.id)) {
            const notice = doc(dbService(), "notifications", noticeDoc.id);
            await setDoc(
              notice,
              {
                [content.id]: {
                  contentComments: {
                    [content.id + "/" + comment.id]: deleteField(),
                  },
                  commentLikes: {
                    [comment.id]: deleteField(),
                  },
                },
              },
              { merge: true },
            );
          }
        });
        getComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const q = query(collection(dbService(), "notifications"));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (
          doc.id === comment.creatorId &&
          doc.data()[content.id]?.commentLikes !== undefined
        ) {
          const likes = Object.keys(
            doc.data()[content.id]?.commentLikes[comment.id] || {},
          ); // array로

          // const userLike = likes.includes(authService().currentUser.uid);
          const userLike = likes.includes(
            content.id + "/" + comment.id + "/" + userObj?.uid,
          );

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

      // comment.id X, 지울 때 복잡해짐, 한 곳에 넣고 where 같은 걸로 필터링해서 commentlikes는 따로 가져와야 할듯?? - XXX
      // commentLikes는 따로 넣고 찾아서 지우는게 나을듯
      const d = doc(dbService(), "notifications", `${comment.creatorId}`);

      if (!currentUserCommentLike) {
        await setDoc(
          d,
          {
            [content.id]: {
              commentLikes: {
                [comment.id]: {
                  [content.id + "/" + comment.id + "/" + uid]: {
                    confirmed: false,
                    lastUpdate: Date.now(),
                    category: "commentLikes",
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
            [content.id]: {
              commentLikes: {
                [comment.id]: {
                  [content.id + "/" + comment.id + "/" + uid]: deleteField(),
                },
              },
            },
          },
          { merge: true },
        );

        // notification(
        //   "REMOVE",
        //   "commentLikes",
        //   comment.creatorId,
        //   content.id,
        //   uid,
        //   comment.id,
        // );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentBoxCommentActionsStyle className="commentBtnWrap">
      <button className="commentLikeBtn" onClick={onLikeToggle}>
        {currentUserCommentLike ? (
          <FontAwesomeIcon className="userLike" icon={like} />
        ) : (
          <FontAwesomeIcon className="userNotLike" icon={faRegHeart} />
        )}
      </button>

      <button className="commentDeleteBtn" onClick={onDeleteComment}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </ContentBoxCommentActionsStyle>
  );
};

export default ContentBoxCommentActions;
