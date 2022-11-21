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
  arrayUnion,
  arrayRemove,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import useGetLike from "hooks/useGetLike";
import onLikeToggle from "utils/onLikeToggle";

const ContentBoxCommentActionsStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    outline: none;
    background: none;
    border: none;
    padding: 0;

    cursor: pointer;

    &.commentDeleteBtn {
      svg {
        color: var(--sub-color);
      }
    }
    &.commentLikeBtn {
      svg {
        &.commentLike {
          color: #ff6633;
        }

        &.commentNotLike {
          color: var(--sub-color);
        }
      }

      span.commentLikeCounter {
        margin: 0 8px;
        font-size: 1.2rem;
      }
    }

    svg {
      font-size: 16px;
    }
  }
`;

const ContentBoxCommentActions = ({
  userObj,
  content,
  comment,
  getComments,
}) => {
  const { likeCount, currentUserLike } = useGetLike(content, comment);

  const onDeleteComment = async () => {
    try {
      const ok = window.confirm(
        "Are you sure you want to delete this comment?",
      );
      if (ok) {
        const commentDoc = doc(dbService(), "comments", `${comment.id}`);
        await deleteDoc(commentDoc);

        const contentsDoc = doc(dbService(), "contents", content.id);
        await setDoc(
          contentsDoc,
          {
            comments: arrayRemove(comment.id),
          },
          { merge: true },
        );

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

  return (
    <ContentBoxCommentActionsStyle className="commentBtnWrap">
      <span className="commentLikeCounter">{likeCount.length}</span>
      <button
        className="commentLikeBtn"
        onClick={() => onLikeToggle(content, currentUserLike, comment)}
      >
        {currentUserLike ? (
          <FontAwesomeIcon className="commentLike" icon={like} />
        ) : (
          <FontAwesomeIcon className="commentNotLike" icon={faRegHeart} />
        )}
      </button>

      {comment.creatorId === userObj.uid && (
        <button className="commentDeleteBtn" onClick={onDeleteComment}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      )}
    </ContentBoxCommentActionsStyle>
  );
};

export default ContentBoxCommentActions;
