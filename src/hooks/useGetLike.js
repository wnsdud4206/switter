import { useEffect, useState } from "react";
import {
  query,
  collection,
  dbService,
  onSnapshot,
  authService,
} from "fbase";

// likeObj
const useGetLike = (contentObj, commentObj) => {
  const [likeCount, setLikeCount] = useState([]);
  const [currentUserLike, setCurrentUserLike] = useState(false);

  useEffect(() => {
    const noticeQuery = query(collection(dbService(), "notifications"));
    onSnapshot(noticeQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        let likes = [];
        let userLike;
        if (commentObj) {
          if (doc.id === commentObj.creatorId) {
            likes = Object.keys(
              doc.data()[contentObj.id]?.commentLikes[commentObj.id] || {},
            ); // array
            userLike = likes.includes(
              contentObj.id +
                "/" +
                commentObj.id +
                "/" +
                authService().currentUser?.uid,
            );
          }
        } else {
          if (doc.id === contentObj.creatorId) {
            likes = Object.keys(doc.data()[contentObj.id]?.contentLikes || {}); // array
            userLike = likes.includes(
              contentObj.id + "/" + authService().currentUser?.uid,
            );
          }
        }

        setLikeCount(likes);
        setCurrentUserLike(userLike);
      });
    });

    // const d = doc(
    //   dbService(),
    //   likeObj?.contentId ? "comments" : "contents",
    //   likeObj.id,
    // );

    // onSnapshot(d, (snapshot) => {
    //   const likes = Object.keys(snapshot.data()?.likes || {}); // array
    //   const userLike = likes.includes(authService().currentUser?.uid);
    //   setLikeCount(likes);
    //   setCurrentUserLike(userLike);
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { likeCount, currentUserLike };
};

export default useGetLike;
