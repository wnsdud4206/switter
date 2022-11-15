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

  padding: 8px;

  outline: 1px solid white;

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
  }

  div {
    /* outline: 1px solid red; */
  }

  div.likeWrap {
    svg.userLike {
      color: #ff6633;
    }
    svg.userNotLike {
      color: white;
    }

    span {
      margin: 0 8px;
      font-size: 1.2rem;
    }
  }
  div.commentWrap {
    svg.commentShow {
      color: #9953e2;
    }
    svg.commentHidden {
      color: white;
    }
  }
`;

const ContentAction = ({ content }) => {
  const [likeCount, setLikeCount] = useState([]);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [commentCount, setCommentCount] = useState([]);
  const dispatch = useDispatch();

  const getComments = async () => {
    try {
      const q = query(
        collection(dbService(), "comments"),
        where("sweetId", "==", content.id),
      );

      onSnapshot(q, (snapshot) => {
        // snapshot.docs.map((doc) => {
        //   console.log(doc.data());
        // });
        const commentArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // creatorId, createdAt, text
        }));
        // console.log(commentArr);   // array
        setCommentCount(commentArr);
      });
    } catch (error) {
      console.error(error);
    }
    // console.log(commentCount);
  };

  useEffect(() => {
    getComments();

    const noticeQuery = query(collection(dbService(), "notifications"));
    onSnapshot(noticeQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === content.creatorId) {
          const likes = doc.data()[content.id]?.sweetLikes
            ? Object.keys(doc.data()[content.id].sweetLikes)
            : []; // array로
          const userLike = likes.includes(
            content.id + "/" + authService().currentUser?.uid,
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

    const d = doc(dbService(), "notifications", `${content.creatorId}`);
    if (!currentUserLike)
      await setDoc(
        d,
        {
          [content.id]: {
            sweetLikes: {
              [content.id + "/" + uid]: {
                confirmed: false,
                lastUpdate: Date.now(),
                category: "sweetLikes",
              },
            },
          },
        },
        { merge: true },
      );
    else if (currentUserLike)
      await setDoc(
        d,
        {
          [content.id]: {
            sweetLikes: { [content.id + "/" + uid]: deleteField() },
          },
        },
        { merge: true },
      );
  };

  const onContentBox = () => {
    dispatch(boxActions.onContentBox(content));
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
          {commentCount.length ? (
            <FontAwesomeIcon className="commentShow" icon={comment} />
          ) : (
            <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
          )}
        </button>
      </div>
      {/* 공유버튼 추가, 해당 content가 열려있는 url주소 복사 */}
    </ContentActionStyle>
  );
};

export default ContentAction;
