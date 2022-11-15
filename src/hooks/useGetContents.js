import { useEffect, useState } from "react";
import {
  dbService,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  onSnapshot,
} from "fbase";

const useGetContents = () => {
  const [contents, setContents] = useState([]);
  // slideIndex가 각각의 값이 있는게 아니라 모두에게 적용됨 - attachment 부분만 component화해서 나눠야 할듯

  // 읽기, 데이터 받아오기
  const getContents = async () => {
    try {
      const contentsCollection = collection(dbService(), "contents");
      onSnapshot(contentsCollection, (querySnapshot) => {
        setContents([]);
        querySnapshot.forEach(async (content) => {
          const dbUser = await getDoc(
            doc(dbService(), "users", content.data().creatorId),
          );

          const dbComment = await getDocs(
            query(
              collection(dbService(), "comments"),
              where("sweetId", "==", content.id),
            ),
          );

          const creatorDisplayName = dbUser.data().displayName;
          const creatorAttachmentUrl = dbUser.data().attachmentUrl;
          const firstComment = dbComment.docs[0]?.data().text;
          let firstCommentName;

          if (dbComment.docs[0]?.data().creatorId) {
            const dbCommentUser = await getDoc(
              doc(dbService(), "users", dbComment.docs[0]?.data().creatorId),
            );
            firstCommentName = dbCommentUser.data().displayName;
          }

          const contentObj = {
            ...content.data(),
            creatorDisplayName,
            creatorAttachmentUrl,
            firstComment,
            firstCommentName,
            id: content.id,
            // id, text, creatorId, createdAt
          };
          
          setContents((prev) => [contentObj, ...prev]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  return contents;
};

export default useGetContents;
