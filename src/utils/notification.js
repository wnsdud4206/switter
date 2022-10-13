import {
  dbService,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "fbase";

// notification: {
//   unconfirmed: {
//     // comment엔 commentId를 넣고 like엔 누른 user의 id를 넣기
//     comment: [arrayUnion(commentId)],
//     like: [arrayUnion(likeUserId)],
//   },
//   confirmed: {
//     comment: ["comment confirmed"],
//     like: ["like confirmed"],
//   },
// },

// sweet의 comments(commentId)&likes(userId)에 대한 알림
// comment의 likes(userId)에 대한 알림
// 어차피 sweet과 comment의 id는 다르기 때문에 comments&likes로 통합

// sweet    - comments
//          - likes
// comment  - likes

// 알림을 확인하고 바로 confirmed에 넣는 것이 아니라 닫을 때 confirmed에 넣어야 한다.(새로운 알림에 대한 표시)

const useNotification = async (
  creatorId = null,
  id = null,
  category, // sweetComments, sweetLiks, commentLikes, confirmed
) => {
  // *** 20221013, 기존 confirmed들을 유지시키는 방법을 알아야함

  // sweetUserId 이런 이름으로 하지 않은 이유는 sweet뿐만 아니라 comment의 알림도 가야하기 때문이다.
  // const ref = doc(dbService(), "users", creatorId);
  // test
  const ref = doc(dbService(), "testCollection", "testDocument");
  switch (category) {
    case "sweetComments":
      return await updateDoc(ref, {
        "notification.unConfirmed.sweetComments": arrayUnion(...[id]),
      });
    case "sweetLikes":
      return await updateDoc(ref, {
        "notification.unConfirmed.sweetLikes": arrayUnion(...[id]),
      });
    case "commentLikes":
      return await updateDoc(ref, {
        "notification.unConfirmed.commentLikes": arrayUnion(...[id]),
      });
    case "confirmed":
      console.log("confirmedddddd");
      const get = await getDoc(ref);
      const { sweetComments, sweetLikes, commentLikes } =
        get.data().notification?.unConfirmed;
      console.log("sweetComments: ", sweetComments);
      console.log("sweetLikes: ", sweetLikes);
      console.log("commentLikes: ", commentLikes);
      // 83번 라인 arrayUnion 에러 :  Function arrayUnion() called with invalid data. Nested arrays are not supported (found in document testCollection/testDocument)
      await updateDoc(ref, {
        // notification: {
        //   unConfirmed: {
        //     sweetComments: [],
        //     sweetLikes: [],
        //     commentLikes: []
        //   },
        // },
        "notification.confirmed.sweetComments": arrayUnion(
          ...(sweetComments.length ? sweetComments : []),
        ),
        "notification.confirmed.sweetLikes": arrayUnion(
          ...(sweetLikes.length ? sweetLikes : []),
        ),
        "notification.confirmed.commentLikes": arrayUnion(
          ...(commentLikes.length ? commentLikes : []),
        ),
      });
      await updateDoc(ref, {
        notification: {
          unConfirmed: {
            sweetComments: [],
            sweetLikes: [],
            commentLikes: [],
          },
        },
      });
      return;
    default:
      return console.log(`${category} is not available.`);
  }
};

export default useNotification;
