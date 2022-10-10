import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SweetCommentStyle from "styles/SweetCommentStyle";
import {
  authService,
  dbService,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "fbase";
import Comment from "./Comment";

// sweets 콜렉션에 comments([]) 추가, comments 콜렉션 추가

const SweetComment = ({ sweetObj, userObj }) => {
  // console.log(sweetObj);
  // console.log(userObj);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 읽기, 데이터 받아오기
  const getComments = async () => {
    try {
      const dbComments = await getDocs(
        collection(dbService(), "comments"),
        // orderBy("createdAt", "desc"),
      );
      setComments([]);
      dbComments.forEach((doc) => {
        const sweetObj = {
          ...doc.data(),
          id: doc.id,
          // id, text, creatorId, createdAt
        };
        // 왜 자꾸 뒤죽박죽으로 받아오지?? 저장할 때 뒤죽박죽인건가? - orderBy 로 정리
        setComments((prev) => [sweetObj, ...prev]);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getComments();

    const q = query(
      collection(dbService(), "comments"),
      orderBy("createdAt", "desc"), // 순서 정렬, 최신 sweet이 위에서 쌓이게 하고 싶기 때문에 "desc" 추가
    );
    onSnapshot(q, (snapshot) => {
      const commentArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // creatorId, createdAt, text
      }));
      console.log(commentArr);
      setComments(commentArr);
    });
  }, []);

  // 쓰기, 데이터 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const commentObj = {
        text: comment,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        sweetId: sweetObj.id,
        displayName: authService().currentUser.displayName,
        like: [],
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "comments"),
        commentObj,
      );

      // console.log(docRef);
      // console.log(commentObj.uid);

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      await updateDoc(d, { comments: arrayUnion(commentObj.uid) });

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
      개발중
      {/* SweetCommentFactory, form */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={comment}
          onChange={onChange}
          placeholder="comment"
          maxLength={120}
        />

        <input id="submitBtn" type="submit" value="Comment" />
      </form>
      {/* SweetCommentList, div */}
      <div id="sweetList">
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
              />
            ))
        ) : (
          <div id="loadingBox">Loading...</div>
        )}
      </div>
      준비중
    </SweetCommentStyle>
  );
};

export default SweetComment;
