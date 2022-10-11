import React, { useState } from "react";
import SweetCommentStyle from "styles/SweetCommentStyle";
import {
  dbService,
  addDoc,
  collection,
  doc,
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
  onCommentEditing,
  offCommentEditing,
  commentEditing,
}) => {
  const [comment, setComment] = useState("");

  // 쓰기, 데이터 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const commentObj = {
        text: comment,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        // attachmentUrl: authService().currentUser.photoURL,
        sweetId: sweetObj.id,
        // displayName: authService().currentUser.displayName,
        like: [],
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "comments"),
        commentObj,
      );

      // console.log(docRef);
      // console.log(commentObj.id);

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      await updateDoc(d, { comments: arrayUnion(docRef.id) });

      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  // input
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  return (
    <SweetCommentStyle>
      <p style={{textAlign: "center", margin: 0}}>아직 댓글 수정&좋아요는 안돼용~</p>
      {/* SweetCommentFactory, form */}
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
          value={comment}
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
        {comments.length &&
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
                onCommentEditing={onCommentEditing}
                offCommentEditing={offCommentEditing}
                commentEditing={commentEditing}
              />
            ))}
      </div>
    </SweetCommentStyle>
  );
};

export default React.memo(SweetComment);
