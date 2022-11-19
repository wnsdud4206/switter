import { authService, dbService } from "fbase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const useHistories = async () => {
  // const usersGet = await getDocs(collection(dbService(), "users"));
  const contentsCol = await getDocs(collection(dbService(), "contents"));
  // const commentsCol = collection(dbService(), "comments");
  // const noticeCol = collection(dbService(), "notifications");

  contentsCol.docs.forEach((data) => {
    console.log(data.data());
  });
  // return usersGet;
};

export default useHistories;
