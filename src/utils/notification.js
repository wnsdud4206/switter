import {
  dbService,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "fbase";

/*
db(firestore) 구조
users collection
notification: {
  unConfirmed: {
    sweetComments: {
      [comment가 달린 해당 sweetId]: [commentId, ...],
      [comment가 달린 해당 sweetId]: [commentId, ...],
      ...
    },
    sweetLikes: {
      [like를 누른 해당 sweetId]: [userId, ...],
      [like를 누른 해당 sweetId]: [userId, ...],
      ...
    },
    commentLikes: {
      [like를 누른 해당 commentId]: [userId, ...],
      [like를 누른 해당 commentId]: [userId, ...],
      ...
    },
  },
  confirmed: "
}

알림생성: notification > unConfirmed > ... > arrayUnion
알림삭제: notification > unConfirmed > ... > arrayRemove
알림확인: notification > unConfirmed > ... > arrayRemove => notification > confirmed > ... > arrayUnion

notification.js
// 알림생성 - field = [sweetComments, sweetLikes, commentLikes], creatorId, activeId, id
notificationRemove.js
// 알림삭제 - field = [sweetComments, sweetLikes, commentLikes, all], creatorId, activeId, id
notificationConfirmed.js
// 알림확인 - field = [sweetComments, sweetLikes, commentLikes, all], creatorId, activeId, id

=> contification.js
// 축약 - field: [sweetComments, sweetLikes, commentLikes, all], creatorId, activeId, id, *category
*/

/*
ex.
// ADD
notification(
  category: "ADD", 
  field: "sweetComments, sweetLikes, commentLikes", 
  creatorId: "creatorId", 
  activeId: "activeId", 
  commentId: "commentId"
);
// REMOVE
notification(
  category: "REMOVE", 
  field: "sweetComments, sweetLikes, commentLikes, all", 
  creatorId: "creatorId", 
  activeId: field === "all" ? "" : "activeId", 
  commentId: field === "all" ? "" : "commentId"
);
// CONFIRM
notification(
  category: "CONFIRM", 
  field: "sweetComments, sweetLikes, commentLikes, all", 
  creatorId: "creatorId", 
  activeId: field === "all" ? "" : "activeId", 
  commentId: field === "all" ? "" : "commentId"
);
*/

/*
*** 20221015, 중요!! sweet을 지울 때 sweetComments, sweetLikes, comentLikes를 모조리 지우도록 해야하고, comment를 지우면 sweetComment, commentLikes를 지우도록 하기
*/

const notification = async (
  category, // ADD, REMOVE, CONFIRM
  field, // sweetComments, sweetLikes, commentLikes
  creatorId = null, // sweet 혹은 comment의 주인id - sweetObj.creatorId, commentObj.creatorId
  activeId = null, // sweetId 혹은 commentId(likes를 분류하기 위한)
  id = null, // sweetComments는 해당 comment의 id, sweetLikes는 {해당sweetId: [좋아요한유저id]}, commentLikes는 {해당commentId: [좋아요한유저id]}
  // notice = null, // true: 추가, false 삭제, null: 확인
) => {
  // sweetUserId 이런 이름으로 하지 않은 이유는 sweet뿐만 아니라 comment의 알림도 가야하기 때문이다.
  const d = doc(dbService(), "users", creatorId);
  // test
  // const d = doc(dbService(), "testCollection", "testDocument");

  let unConfirmedRoute;
  let confirmedRoute;

  if (category === "ADD") {
    unConfirmedRoute = `notification.unConfirmed.${
      field === "sweetComments" ? field : field + "." + activeId
    }`;
  } else if (category === "CINFIRM" || category === "REMOVE") {
    if (field !== "all") {
      unConfirmedRoute = `notification.unConfirmed.${
        field === "sweetComments" ? field : field + "." + activeId
      }`;
      confirmedRoute = `notification.confirmed.${
        field === "sweetComments" ? field : field + "." + activeId
      }`;
    }
  }

  switch (category) {
    case "ADD":
      await updateDoc(d, {
        [unConfirmedRoute]: arrayUnion(...[id]),
      });
      return;
    case "REMOVE":
      if (field !== "all") {
        await updateDoc(d, {
          [unConfirmedRoute]: arrayRemove(...[id]),
          [confirmedRoute]: arrayRemove(...[id]),
        });
      } else if (field === "all") {
        return await updateDoc(d, {
          notification: deleteField(),
        });
      }
      return;
    case "CONFIRM":
      if (field !== "all") {
        await updateDoc(d, {
          [unConfirmedRoute]: arrayRemove(...[id]),
          [confirmedRoute]: arrayUnion(...[id]),
        });
      } else if (field === "all") {
        try {
          // const get = await getDocs(d);

          const q = query(
            collection(dbService(), "testCollection"),
            where("creatorId", "==", creatorId),
          );
          const querySnapshot = await getDocs(q);

          let resultSweetComments;
          let resultSweetLikes;
          let resultCommentLikes;
          querySnapshot.forEach((doc) => {
            resultSweetComments = (
              doc.data().notification.unConfirmed?.sweetComments || []
            ).concat(doc.data().notification.confirmed.sweetComments || []);
            resultSweetLikes =
              doc.data().notification.confirmed.sweetLikes || {};
            resultCommentLikes =
              doc.data().notification.confirmed.commentLikes || {};

            for (const [key, value] of Object.entries(
              doc.data().notification.unConfirmed?.sweetLikes || {},
            )) {
              resultSweetLikes[key] = [
                ...(resultSweetLikes[key] || []),
                ...value,
              ];
            }

            for (const [key, value] of Object.entries(
              doc.data().notification.unConfirmed?.commentLikes || {},
            )) {
              resultCommentLikes[key] = [
                ...(resultCommentLikes[key] || []),
                ...value,
              ];
            }

            console.log(resultSweetComments);
            console.log(resultSweetLikes);
            console.log(resultCommentLikes);
          });

          await updateDoc(d, {
            "notification.unConfirmed": {},
            // "notification.unConfirmed.sweetComments": arrayRemove(
            //   ...(sweetComments.length ? sweetComments : []),
            // ),
            // "notification.unConfirmed.sweetLikes": arrayRemove(
            //   ...(sweetLikes.length ? sweetLikes : []),
            // ),
            // "notification.unConfirmed.commentLikes": arrayRemove(
            //   ...(commentLikes.length ? commentLikes : []),
            // ),
            "notification.confirmed.sweetComments": arrayUnion(
              ...(resultSweetComments ? resultSweetComments : []),
            ),
            "notification.confirmed.sweetLikes": resultSweetLikes,
            "notification.confirmed.commentLikes": resultCommentLikes,
          });
          return;
        } catch (error) {
          console.error(error);
        }
      }
      return;
    default:
      return console.log(`${category} is not available.`);
  }
};

export default notification;

// notification: {
//   unconfirmed: {
//     // comment엔 commentId를 넣고 like엔 누른 user의 id를 넣기
//     sweetComments: arrayUnion(commentId),
//     sweetLikes: arrayUnion(likeUserId),
//     commentLikes: arrayUnion(commentLikeUserId),
//   },
//   confirmed: {
//     sweetComments: arrayUnion(commentId),
//     sweetLikes: arrayUnion(likeUserId),
//     commentLikes: arrayUnion(commentLikeUserId),
//   },
// },

// sweet의 comments(commentId)&likes(userId)에 대한 알림
// comment의 likes(userId)에 대한 알림
// 어차피 sweet과 comment의 id는 다르기 때문에 comments&likes로 통합

// sweet    - comments []
//          - likes {}
// comment  - likes {}

// 알림을 확인하고 바로 confirmed에 넣는 것이 아니라 닫을 때 confirmed에 넣어야 한다.(새로운 알림에 대한 표시) -> 닫을 때가 아니라 클릭해서 확인하거나 옵션에서 확인을 누리면 confirmed에 넣고 옵션에 삭제를 누르면 둘 다 지워지도록

// 지금 너무 어렵게 설계하는 듯..
/*
1. 현재 각각의 sweets.[userId].comments, sweets.[userId].like, comments.[commentId].like 들(firestore)에게 새로 confirmedComments(sweet만), confirmedLikes 라는 새 필드를 만들고 확인하면 여기에 넣는 걸로 알림 및 알림설정을 할 수 있을 것 같다. - 그럼 sweet acrion과 comment action에 각각의 갯수를 알려주는 text가 기존 필드만 확인을 하는 문제가 생긴다. 그럼 이 두 필드의 length를 더해서 하는 건 어떨까?
2. 1.의 문제를 보완하기 위해 새로운 필드를 만드는 것이 아닌 기존 필드 배열을 객체로 만들고 그 객체안에 

++ 좋아요와 댓글이 안본 사이에 여러개 라면 
*/
