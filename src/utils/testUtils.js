import { getNodeText } from "@testing-library/react";
import { dbService } from "fbase";
import {
  deleteField,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  query,
  collection,
  where,
  onSnapshot,
  addDoc,
  deleteDoc
} from "fbase";

const testUtils = async () => {
  try {

    // orN87t69Rl9SGu8OQfFv
    // eW6c1fOtG9bFy7Ktkb01

    const comment = doc(dbService(), "comments", `"eW6c1fOtG9bFy7Ktkb01"`);
    console.log(comment);
    // const get = await getDoc(comment);
    // console.log(get);
    await deleteDoc(comment);

    // const commentQuery = query(collection(dbService(), "testCollection"), where("creatorId", "==", "3"));
    // const commentDoc = await getDocs(commentQuery);
    // commentDoc.forEach(async (doc) => {
    //   // const comment = doc(dbService(), "comments", `${doc.id}`);
    //   // const get = getDoc(comment);
    //   // console.log(get);
    //   console.log(doc.id);
    //   await deleteDoc(doc);
    // })
    // for (let comment of commentObj) {
    //   let commentDoc = doc(dbService(), "comments", `${comment}`);
    //   await deleteDoc(commentDoc);
    // }


    
    
    // const d = doc(dbService(), "testCollection", "testDocument2");
      // const d = await addDoc(collection(dbService(), "testCollection"));
    // const get = await getDoc(d);
    // // console.log(get.data().id);  // XXX
    // console.log(get.id);

    // const q = query(collection(dbService(), "notifications"));
    // onSnapshot(q, (data) => {
    //   data.docs.forEach((doc) => {
    //     // console.log(doc.data().id);
    //     console.log(doc.id);      // sweetId
    //   })
    // });
    // const testDoc = await getDoc(d);
    // console.log(testDoc.data().notification.unconfirmed);
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

    // const field = "sweetComments";

    // if (field !== "commentLikes") {
    //   await setDoc(
    //     d,
    //     {
    //       sweetId: {
    //         [field]: {
    //           // id: ["commentId3"],    // 기존 데이터 없어짐
    //           id: arrayUnion(field === "sweetLikes" ? "id1" : "commentId2"),
    //           lastUpdate: Date.now(),
    //         },
    //       },
    //     },
    //     { merge: true },
    //   );
    // } else if (field === "commentLikes") {
    //   await setDoc(
    //     d,
    //     {
    //       sweetId: {
    //         [field]: [
    //           {
    //             id: arrayUnion("commentId1"),
    //             lastUpdate: Date.now(),
    //           },
    //         ],
    //       },
    //     },
    //     { merge: true },
    //   );
    // }

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
  } catch (error) {
    console.error(error);
  }
};

export default testUtils;
