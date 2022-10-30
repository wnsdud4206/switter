import React, { useState } from "react";
import SweetCommentStyle from "styles/sweet/comment/SweetCommentStyle";
import {
  dbService,
  addDoc,
  collection,
  doc,
  setDoc,
} from "fbase";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";

// sweets 콜렉션에 comments([]) 추가, comments 콜렉션 추가

const SweetComment = ({
  sweetObj,
  userObj,
  comments,
  onCommentEditResizeToggle,
  // offCommentEditResize,
  getId
}) => {
  const [commentText, setCommentText] = useState("");
  const [onlyCommentEditing, setOnlyCommentEditing] = useState("");

  const onOnlyCommentEditing = (commentId) => {
    // console.log(commentId);
    setOnlyCommentEditing(commentId);
  };

  // 쓰기, 데이터 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const commentObj = {
        text: commentText,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        sweetId: sweetObj.id,
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "comments"),
        commentObj,
      );

      const noticeDoc = doc(
        dbService(),
        "notifications",
        `${sweetObj.creatorId}`,
      );
      await setDoc(
        noticeDoc,
        {
          [sweetObj.id]: {
            sweetComments: {
              [sweetObj.id + "/" + docRef.id]: {
                confirmed: false,
                lastUpdate: Date.now(),
                category: "sweetComments"
              },
            },
          },
        },
        { merge: true },
      );

      // notification(
      //   "ADD",
      //   "sweetComments",
      //   sweetObj.creatorId,
      //   sweetObj.id,
      //   null,
      //   docRef.id,
      // );

      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  // input
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCommentText(value);
  };

  return (
    <SweetCommentStyle>
      <form onSubmit={onSubmit}>
        <div className="userImage">
          {userObj.photoURL ? (
            <img
              src={userObj.photoURL}
              width="100%"
              height="100%"
              alt="userImage"
            />
          ) : (
            <FontAwesomeIcon id="profileicon" icon={faUser} />
          )}
        </div>

        <input
          type="text"
          value={commentText}
          onChange={onChange}
          placeholder="comment"
          maxLength={120}
          required
        />

        <label htmlFor="commentSubmitBtn">
          <FontAwesomeIcon icon={faChevronRight} />
          <input id="commentSubmitBtn" type="submit" value="Comment" />
        </label>
      </form>
      {/* SweetCommentList, div */}
      <div id="commentList">
        {comments.length ? (
          comments
            .sort((a, b) => {
              if (a.createdAt < b.createdAt) return -1;
              if (a.createdAt > b.createdAt) return 1;
              return 0;
            })
            .map((comment) => (
              <Comment
                key={comment.id}
                commentObj={comment}
                isOwner={comment.creatorId === userObj.uid}
                userObj={userObj}
                sweetObj={sweetObj}
                onlyCommentEditing={onlyCommentEditing}
                onOnlyCommentEditing={onOnlyCommentEditing}
                onCommentEditResizeToggle={onCommentEditResizeToggle}
                // offCommentEditResize={offCommentEditResize}
                getId={getId}
              />
            ))
        ) : (
          <></>
        )}
      </div>
    </SweetCommentStyle>
  );
};

export default React.memo(SweetComment);
