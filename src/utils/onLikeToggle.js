import {
  authService,
  doc,
  dbService,
  setDoc,
  arrayUnion,
  deleteField,
  arrayRemove,
} from "fbase";

const onLikeToggle = async (contentObj, currentUserLike, commentObj) => {
  const { uid } = authService().currentUser;

  const noticeDoc = doc(dbService(), "notifications", contentObj.creatorId);
  const document = commentObj
    ? doc(dbService(), "comments", commentObj.id)
    : doc(dbService(), "contents", contentObj.id);

  await setDoc(
    noticeDoc,
    {
      // [commentObj
      //   ? contentObj.id + "/" + commentObj.id + "/" + uid
      //   : contentObj.id + "/" + uid]: currentUserLike
      //   ? deleteField()
      //   : {
      //       confirmed: false,
      //       lastUpdate: Date.now(),
      //       category: commentObj ? "commentLikes" : "contentLikes",
      //     },
      [contentObj.id]: commentObj
        ? {
            commentLikes: {
              [commentObj.id]: {
                [contentObj.id + "/" + commentObj.id + "/" + uid]:
                  currentUserLike
                    ? deleteField()
                    : {
                        confirmed: false,
                        lastUpdate: Date.now(),
                        category: "commentLikes",
                      },
              },
            },
          }
        : {
            contentLikes: {
              [contentObj.id + "/" + uid]: currentUserLike
                ? deleteField()
                : {
                    confirmed: false,
                    lastUpdate: Date.now(),
                    category: "contentLikes",
                  },
            },
          },
    },
    { merge: true },
  );
  await setDoc(
    document,
    { likes: currentUserLike ? arrayRemove(uid) : arrayUnion(uid) },
    { merge: true },
  );
};

export default onLikeToggle;
