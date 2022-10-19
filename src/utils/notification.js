import { dbService, doc, getDoc, setDoc, deleteField } from "fbase";

/*
* confirmed은 이미 sweets collection, comments collection에 like, comments 필드로 두고 comment나 likes가 추가될 때 sweets collection, comments collection의 필드 뿐만 아니라 users collection의 unConfirmed 필드에도 추가하도록 구현하고 유저가 확인을 하면 지우는 식으로 해야할듯

* 근데 이미 sweetComments, sweetLikes는 sweets colection에 commentLikes는 comments collection 에 있는데??
ex. 게시글 마다 1명일 때: ㅇㅇㅇ님이 좋아요&댓글을 달았습니다., 게시글 마다 여러명일 때 : ㅇㅇㅇ님 외 x명이 좋아요&댓글을 달았습니다.
db(firestore) 구조
users collection
// comment지울 때 : sweetComments [id] arrayUnion() = (id) => commentLikes {id: deleteFiled()}
// sweet지울 때 : 
<creatorId> document
notification: {
  unConfirmed: {
    <sweetId>: {
      sweetComments: [
        <id>(commentId),
        ...
      ],
      sweetLikes: [
        <id>(userId),
        ...
      ],
      commentLikes: [
        {<commentId>: <id>(userId)},
        ...
      ]
    },
    ...
  },
  confirmed: "
}
// 수정?, setDoc + { merge: true }!!!
notification: {
  unConfirmed: {
    <sweetId>: {
      sweetComments: {
        <id>(commentId): Date.now(),
        ...
      },
      sweetLikes: {
        <id>(userId): Date.now(),
        ...
      },
      commentLikes: {
        <commentId>: {
          <id>(userId): Date.now()
        },
        ...
      }
    },
    ...
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
// DELETE

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

본인 sweet 혹은 comment에 likes나 comments를 달면 알림 안가게

creatorUser(sweet또는comment) 입장에서 comment를 지우면 commentLikes도 삭제, sweet을 지우면 sweetLikes, sweetComments, commentLikes도 삭제
*/

const notification = async (
  category, // ADD, REMOVE, CONFIRM
  field, // sweetComments, sweetLikes, commentLikes
  creatorId = null, // sweet 혹은 comment의 주인id - sweetObj.creatorId, commentObj.creatorId
  sweetId = null, // sweetId 혹은 commentId(likes를 분류하기 위한)
  id = null, // sweetComments는 해당 comment의 id, sweetLikes는 {해당sweetId: [좋아요한유저id]}, commentLikes는 {해당commentId: [좋아요한유저id]}
  commentId = null, // commentLikes만
  // notice = null, // true: 추가, false 삭제, null: 확인
) => {
  // sweetUserId 이런 이름으로 하지 않은 이유는 sweet뿐만 아니라 comment의 알림도 가야하기 때문이다.
  const d = doc(dbService(), "users", creatorId);
  // test
  // const d = doc(dbService(), "testCollection", "testDocument");

  /*
  category: ADD, REMOVE, CONFIRM
  field: sweetComments, sweetLikes, commentLikes, all
  creatorId: 현재 유저 본인의 id
  sweetId: 현재 내가 like&comment를 할 sweet의 id
  id: sweetLikes에 필요한 userId
  commentId: sweetComments, commentLikes에 필요한 commentId

  ADD
  - sweetComments: ADD, sweetComments, creatorId, sweetId, id(null), commentId(commentId)
  - sweetLikes: ADD, sweetLikes, creatorId, sweetId, id(userId), commentId(null)
  - commentLikes: ADD, commentLikes, creatorId, sweetId, id(userId), commentId(commentId) 

  REMOVE
  - sweetComments: REMOVE, sweetComments, creatorId, sweetId, id(null), commentId(commentId);
  - sweetLikes: REMOVE, sweetLikes, creatorId, sweetId, id(userId), commentId(null);
  - commentLikes: REMOVE, commentLikes, creatorId, sweetId, id(userId), commentId(commentId) 
  - all: REMOVE, all, creatorId, sweetId, ...null

  CONFIRM
  - sweetComments: CONFIRM, sweetComments, creatorId, sweetId, id(null), commentId(commentId);
  - sweetLikes: CONFIRM, sweetLikes, creatorId, sweetId, id(userId), commentId(null);
  - commentLikes: CONFIRM, commentLikes, creatorId, sweetId, id(userId), commentId(commentId) 
  - all: CONFIRM, all, creatorId, sweetId, ...null
  */

  // like를 하고 댓글을 달면 like field가 없어지는 문제, 덮어씌우는 듯 아마 다른 경우도 덮어씌우게 될듯

  // sweets collection과 comments collection에 들어가는 likes, comments fied도 여기서 한 번에 줘도 될듯

  switch (category) {
    case "ADD":
      await setDoc(
        d,
        {
          notification: {
            unConfirmed: {
              [sweetId]: {
                [field]: {
                  [field === "sweetLikes" ? id : commentId]:
                    field === "commentLikes"
                      ? { [id]: Date.now() }
                      : Date.now(),
                },
              },
            },
          },
        },
        { merge: true },
      );
      return;
    case "REMOVE":
      const deleteRoute =
        field === "sweetComments"
          ? {
              [field]: {
                [commentId]: deleteField(),
              },
              commentLikes: {
                [commentId]: deleteField(),
              },
            }
          : {
              [field]:
                field === "sweetLikes"
                  ? { [id]: deleteField() }
                  : { [commentId]: { [id]: deleteField() } },
            };

      await setDoc(
        d,
        {
          notification:
            field === "all"
              ? sweetId
                ? {
                    unConfirmed: {
                      [sweetId]: deleteField(),
                    },
                    confirmed: {
                      [sweetId]: deleteField(),
                    },
                  }
                : {
                    unConfirmed: deleteField(),
                    confirmed: deleteField(),
                  }
              : {
                  unConfirmed: {
                    [sweetId]: deleteRoute,
                  },
                  confirmed: {
                    [sweetId]: deleteRoute,
                  },
                },
        },
        { merge: true },
      );
      return;
    case "CONFIRM":
      const get = await getDoc(d);
      console.log(get.data().notification.test);
      const data =
        field === "all"
          ? get.data().notification.unConfirmed
          : field === "commentLikes"
          ? get.data().notification.unConfirmed[sweetId][field][commentId][id]
          : get.data().notification.unConfirmed[sweetId][field][
              field === "sweetLikes" ? id : commentId
            ];

      await setDoc(
        d,
        {
          notification:
            field === "all"
              ? { unConfirmed: deleteField(), confirmed: data }
              : {
                  unConfirmed: {
                    [sweetId]: {
                      [field]: {
                        [field === "sweetLikes" ? id : commentId]:
                          field === "commentLikes"
                            ? { [id]: deleteField() }
                            : deleteField(),
                      },
                    },
                  },
                  confirmed: {
                    [sweetId]: {
                      [field]: {
                        [field === "sweetLikes" ? id : commentId]:
                          field === "commentLikes" ? { [id]: data } : data,
                      },
                    },
                  },
                },
        },
        { merge: true },
      );
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
