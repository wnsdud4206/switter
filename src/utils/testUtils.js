import { dbService } from "fbase";
import {
  deleteField,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  collection,
  where,
  onSnapshot,
} from "fbase";

const testUtils = async () => {
  const d = doc(dbService(), "testCollection", "testDocument2");
  const q = query(
    collection(dbService(), "testCollection"),
    where("creatorId", "==", "2"),
  );
  const testDoc = await getDoc(d);
  console.log(testDoc.data().notification.unconfirmed);
  // let result;
  // snapshot.docs.forEach((doc) => {
  //   result = doc.data().notification.unconfirmed;
  // });
  // console.log(result);

  // const result = await getDoc(d);
  // const result2 = await result.data()["notification"].unconfirmed["sweetId1"];
  // console.log(result2);

  // const sweetId = "sweetId2";
  // const field = "commentLikes";
  // const id = "userId3";
  // const commentId = "commentId3";

  const test1 = { test1: { b: 2 } };

  await setDoc(
    d,
    {
      test: {
        test1,
      },
      // notification: {
      //   unConfirmed: {
      //     [sweetId]: {
      //       [field]: {
      //         [field === "sweetLikes" ? id : commentId]:
      //           field === "commentLikes" ? { [id]: Date.now() } : Date.now(),
      //       },
      //     },
      //   },
      // },
    },
    { merge: true },
  );

  //   await updateDoc(
  //     d,
  //     {
  //       // "notification.unconfirmed.sweetId1.testField": arrayUnion({
  //       //   id2: 2,
  //       // }),
  //       notification: {
  //         unconfirmed: {
  //           sweetId1: {
  //             testField: {
  //               id1: 1,
  //             },
  //           },
  //         },
  //       },
  //     },
  //     { merge: true },
  //   );
};

export default testUtils;
