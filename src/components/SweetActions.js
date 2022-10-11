import {
  faComment,
  faHeart as like,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faRegHeart,
  faComment as faRegCommnet,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SweetActionsStyle from "styles/SweetActionsStyle";
import { useState, useEffect } from "react";
import {
  dbService,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  authService,
  query,
  collection,
  onSnapshot,
} from "fbase";

/*
하트의 색이 여러개(깨진하트(1개)포함)로 하거나 얼굴 이모티콘 여러개로 해도 될듯, 일단 지금은 좋아요&안좋아요(싫어요처럼 -1은 안하거나 나중에 나누거나)
*/

const SweetActoins = ({
  sweetObj,
  onScrollComment,
  scrollComment,
  commentCount,
}) => {
  const [likeCount, setLikeCount] = useState(sweetObj.like);
  const [currentUserLike, setCurrentUserLike] = useState(false);

  // console.log(useSnapshot(sweetObj));

  useEffect(() => {
    const q = query(collection(dbService(), "sweets"));
    onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs[0].data());
      // eslint-disable-next-line no-unused-vars
      const sweetArr = snapshot.docs.forEach((doc) => {
        if (doc.id === sweetObj.id) {
          const like = doc.data().like;
          // console.log(like)  // 없으면 undefined 반환
          setLikeCount(like);

          if (like !== undefined) {
            const userLike = like.includes(authService().currentUser.uid);
            setCurrentUserLike(userLike);
          }
          return;
        }
      });
    });

    // 이거랑 setCurrentUserLike랑 무한하게 불려짐, 끊기는느낌, 한박자느린느낌, deps 때문인것 같긴 한데 없으면 제대로 작동하지 않음 - https://kr.coderbridge.com/questions/ee895ba7bea54f5bba2fbdd1036d9a82 참고해보기

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLike = async () => {
    try {
      const { uid } = authService().currentUser;

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      // 숫자가 아니라 배열안에 uid(creatorId)를 넣어야할듯, 한 유저당 한 번씩
      await updateDoc(d, { like: arrayUnion(uid) });
    } catch (error) {
      console.error(error);
    }
  };
  const onHate = async () => {
    try {
      const { uid } = authService().currentUser;

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      // 숫자가 아니라 배열안에 uid(creatorId)를 넣어야할듯, 한 유저당 한 번씩
      await updateDoc(d, { like: arrayRemove(uid) });
    } catch (error) {
      console.error(error);
    }
  };

  const onLikeToggle = () => {
    if (!currentUserLike) onLike();
    else if (currentUserLike) onHate();
  };

  return (
    <SweetActionsStyle className="actions">
      <div className="likeAndHateContainer">
        <div className="likeAndHateWrap">
          {" "}
          {/* hover */}
          <div className="likeAndHatePopup">
            {" "}
            {/* display */}
            <div className="likeAndHate">
              <button className="like" onClick={onLike}>
                <FontAwesomeIcon icon={like} />
              </button>
              <button className="hate" onClick={onHate}>
                <FontAwesomeIcon icon={faHeartCrack} />
              </button>
            </div>
          </div>
          <button className="emptyLike" onClick={onLikeToggle}>
            {/* 싫어요도 추가, 다시 누르먄 좋아요&싫어요 취소 */}
            {currentUserLike ? (
              <FontAwesomeIcon className="userLike" icon={like} />
            ) : (
              <FontAwesomeIcon className="userEmpty" icon={faRegHeart} />
            )}
          </button>
        </div>

        <span className="likeCounter">{likeCount && likeCount.length}</span>
      </div>

      {/* 여기에 상태창 나타났다 지워지는 로직 구현하기(ex. 좋아요를 눌렀습니다., 댓글 보는중...) */}

      <div className="commentWrap">
        <span className="commentCounter">{commentCount}</span>
        <button className="commentBtn" onClick={onScrollComment}>
          {scrollComment ? (
            <FontAwesomeIcon className="commentShow" icon={faComment} />
          ) : (
            <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
          )}
        </button>
      </div>
    </SweetActionsStyle>
  );
};

export default SweetActoins;
