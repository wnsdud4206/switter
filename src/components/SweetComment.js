import React, { useEffect, useState } from "react";
import SweetCommentStyle from "styles/SweetCommentStyle";
import {
  dbService,
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
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
}) => {
  const [commentText, setCommentText] = useState("");
  const [onlyCommentEditing, setOnlyCommentEditing] = useState("");

  const onOnlyCommentEditing = (commentId) => {
    console.log(commentId);
    setOnlyCommentEditing(commentId);
  };

  useEffect(() => {
    console.log(comments);
    // for (const [key, value] of Object.entries(
    //   comments.sort((a, b) => {
    //     if (a.createdAt < b.createdAt) return -1;
    //     if (a.createdAt > b.createdAt) return 1;
    //     return 0;
    //   }),
    // )) {
    //   console.log(key);
    //   console.log(value);
    // }
    // comments
    //   .sort((a, b) => {
    //     if (a.createdAt < b.createdAt) return -1;
    //     if (a.createdAt > b.createdAt) return 1;
    //     return 0;
    //   })
    //   .map((comment) => {
    //     console.log(comment.id);
    //     console.log(comment);
    //     console.log(comment.creatorId === userObj.uid);
    //     console.log(userObj);
    //     console.log(sweetObj);
    //     console.log(onlyCommentEditing);
    //     console.log(onOnlyCommentEditing);
    //     console.log(onCommentEditResizeToggle);
    //     // <Comment
    //     //   key={comment.id}
    //     //   commentObj={comment}
    //     //   isOwner={comment.creatorId === userObj.uid}
    //     //   userObj={userObj}
    //     //   sweetObj={sweetObj}
    //     //   onlyCommentEditing={onlyCommentEditing}
    //     //   onOnlyCommentEditing={onOnlyCommentEditing}
    //     //   onCommentEditResizeToggle={onCommentEditResizeToggle}
    //     // />
    //   });
    // 이런식으로 해야할듯? 배열이 아닌데 자꾸 map으로 해서 댓글창 열 때마다 에러가 난듯, 근데 이전에도 obj였을텐데 왜 잘됐지??
    /* {comments.length ? (
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
              />
            ))
        ) : (
          <></>
        )} */
  }, []);

  // 쓰기, 데이터 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const commentObj = {
        text: commentText,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        // attachmentUrl: authService().currentUser.photoURL,
        sweetId: sweetObj.id,
        // displayName: authService().currentUser.displayName,
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "comments"),
        commentObj,
      );

      // console.log(docRef);
      // console.log(commentObj.id);

      const sweetDoc = doc(dbService(), "sweets", `${sweetObj.id}`);
      await updateDoc(sweetDoc, { comments: arrayUnion(docRef.id) });

      const noticeDoc = doc(dbService(), "notifications", `${sweetObj.id}`);
      await setDoc(
        noticeDoc,
        {
          sweetComments: {
            [docRef.id]: {
              confirmed: false,
              lastUpdate: Date.now(),
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
