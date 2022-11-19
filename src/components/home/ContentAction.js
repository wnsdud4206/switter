import { useEffect, useState } from "react";
import {
  dbService,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
  query,
  onSnapshot,
  orderBy,
  authService,
  deleteField,
  arrayUnion,
  arrayRemove,
} from "fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as like,
  faComment as comment,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faRegHeart,
  faComment as faRegCommnet,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { boxActions } from "modules/contentBoxReducer";

const ContentActionStyle = styled.div`
  display: flex;
  justify-content: space-between;

  /* background-color: var(--background-color); */

  padding: 8px;

  div {
    display: flex;
    justify-content: center;

    button {
      background: none;
      outline: none;
      border: none;
      padding: 0;

      cursor: pointer;

      svg {
        font-size: 22px;
      }
    }

    &.likeWrap {
      button.likeBtn {
        svg.userLike {
          color: #ff6633;
        }
        svg.userNotLike {
          color: var(--sub-color);
        }
      }

      span {
        margin: 0 8px;
        font-size: 1.2rem;
      }
    }

    &.commentWrap {
      button.commentBtn {
        svg {
          color: var(--sub-color);
        }
      }
    }
  }
`;

const ContentAction = ({ contentObj }) => {
  const [likeCount, setLikeCount] = useState([]);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  // const [commentCount, setCommentCount] = useState([]);
  const dispatch = useDispatch();

  // const getComments = async () => {
  //   try {
  //     const commentQuery = query(
  //       collection(dbService(), "comments"),
  //       where("contentId", "==", contentObj.id),
  //     );

  //     onSnapshot(commentQuery, (snapshot) => {
  //       // snapshot.docs.map((doc) => {
  //       //   console.log(doc.data());
  //       // });
  //       const commentArr = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(), // creatorId, createdAt, text
  //       }));
  //       // console.log(commentArr);   // array
  //       setCommentCount(commentArr);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // console.log(commentCount);
  // };

  useEffect(() => {
    // getComments();

    const noticeQuery = query(collection(dbService(), "notifications"));
    onSnapshot(noticeQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === contentObj.creatorId) {
          const likes = doc.data()[contentObj.id]?.contentLikes
            ? Object.keys(doc.data()[contentObj.id].contentLikes)
            : []; // array로
          const userLike = likes.includes(
            contentObj.id + "/" + authService().currentUser?.uid,
          );

          // console.log(likes); // 없으면 undefined 반환
          setLikeCount(likes);
          setCurrentUserLike(userLike);
          // console.log(likes);
          // console.log(userLike);
        }
      });
    });
  }, []);

  const onLikeToggle = async () => {
    const { uid } = authService().currentUser;

    const noticeDoc = doc(dbService(), "notifications", contentObj.creatorId);
    const contentDoc = doc(dbService(), "contents", contentObj.id);

    if (!currentUserLike) {
      await setDoc(
        noticeDoc,
        {
          [contentObj.id]: {
            contentLikes: {
              [contentObj.id + "/" + uid]: {
                confirmed: false,
                lastUpdate: Date.now(),
                category: "contentLikes",
              },
            },
          },
        },
        { merge: true },
      );
      await setDoc(contentDoc, { likes: arrayUnion(uid) }, { merge: true });
    } else if (currentUserLike) {
      await setDoc(
        noticeDoc,
        {
          [contentObj.id]: {
            contentLikes: { [contentObj.id + "/" + uid]: deleteField() },
          },
        },
        { merge: true },
      );
      await setDoc(contentDoc, { likes: arrayRemove(uid) }, { merge: true });
    }
  };

  const onContentBox = () => {
    dispatch(boxActions.onContentBox(contentObj));
  };

  return (
    <ContentActionStyle className="contentActions">
      <div className="likeWrap">
        <button className="likeBtn" onClick={onLikeToggle}>
          {currentUserLike ? (
            <FontAwesomeIcon className="userLike" icon={like} />
          ) : (
            <FontAwesomeIcon className="userNotLike" icon={faRegHeart} />
          )}
        </button>
        <span className="likeCounter">{likeCount.length}</span>
      </div>

      <div className="commentWrap">
        {/* <span className="commentCounter">{commentCount.length}</span> */}
        <button className="commentBtn" onClick={onContentBox}>
          {/* 이전처럼 comment가 열리고 닫히는게 아니라 comment의 존재여부로 icon 다르게 주기 */}
          {/* {commentCount.length ? (
            <FontAwesomeIcon className="commentShow" icon={comment} />
          ) : (
            <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
          )} */}
          <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
        </button>
      </div>
      {/* 공유버튼 추가, 해당 content가 열려있는 url주소 복사 */}
    </ContentActionStyle>
  );
};

export default ContentAction;
