import {
  faComment,
  faHeart as like,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyLike } from "@fortawesome/free-regular-svg-icons";
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

const SweetActoins = ({ sweetObj }) => {
  const [likeCount, setLikeCount] = useState([]);
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
          return;
        }
      });
    });

    // 이거랑 setCurrentUserLike랑 무한하게 불려짐, 끊기는느낌, 한박자느린느낌, deps 때문인것 같긴 한데 없으면 제대로 작동하지 않음 - https://kr.coderbridge.com/questions/ee895ba7bea54f5bba2fbdd1036d9a82 참고해보기

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeCount]);

  useEffect(() => {
    if (likeCount === undefined || likeCount === null) return;
    const userLike = likeCount.includes(authService().currentUser.uid);
    
    setCurrentUserLike(userLike);
  }, [likeCount]);

  const onLike = async () => {
    try {
      const { uid } = authService().currentUser;

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      // 숫자가 아니라 배열안에 uid(creatorId)를 넣어야할듯, 한 유저당 한 번씩
      const like = await updateDoc(d, { like: arrayUnion(uid) });

      setLikeCount(like);
    } catch (error) {
      console.error(error);
    }
  };
  const onHate = async () => {
    try {
      const { uid } = authService().currentUser;

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      // 숫자가 아니라 배열안에 uid(creatorId)를 넣어야할듯, 한 유저당 한 번씩
      const like = await updateDoc(d, { like: arrayRemove(uid) });

      setLikeCount(like);
    } catch (error) {
      console.error(error);
    }
  };

  const onLikeToggle = async () => {
    if (!currentUserLike) onLike();
    else if (currentUserLike) onHate();
  };

  return (
    <SweetActionsStyle className="actions">
      <div className="likeAndHateContainer">
        <div className="likeAndHateWrap">
          <div className="likeAndHatePopup">
            <div className="likeAndHate">
              <button className="like" onClick={onLike}>
                <FontAwesomeIcon icon={like} />
              </button>
              <button className="hate">
                <FontAwesomeIcon icon={faHeartCrack} onClick={onHate} />
              </button>
            </div>
          </div>

          <button className="emptyLike" onClick={onLikeToggle}>
            {/* 싫어요도 추가, 다시 누르먄 좋아요&싫어요 취소 */}
            {currentUserLike ? (
              <FontAwesomeIcon className="userLike" icon={like} />
            ) : (
              <FontAwesomeIcon className="userEmpty" icon={emptyLike} />
            )}
          </button>
        </div>

        <span className="likeCounter">{likeCount && likeCount.length}</span>
      </div>

      <button className="commentBtn">
        <FontAwesomeIcon icon={faComment} />
      </button>
    </SweetActionsStyle>
  );
};

export default SweetActoins;