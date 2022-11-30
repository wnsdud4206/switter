import React, { useEffect, useState } from "react";
import { dbService, collection, where, query, onSnapshot } from "fbase";
import styled from "styled-components";
import LoadingBox from "components/loading/LoadingBox";
import Content from "./Content";
import { useLocation, useParams } from "react-router-dom";
import ContentNav from "./ContentNav";

const ContentsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 470px;
  padding: 32px 32px 32px 0;

  div#emptyContent {
    text-align: center;
    font-size: 1.1em;

    width: 100%;

    padding: 32px 0;
  }

  @media (max-width: 850px) {
    padding: 32px 0;
  }
`;

const ContentsList = ({ userObj }) => {
  const { pathname } = useLocation();
  const { name } = useParams();
  const [contents, setContents] = useState([]);
  const [myCommentsArr, setMyCommentsArr] = useState([]);
  const [contentType, setContentType] = useState(
    pathname.includes("profile") ? "myContents" : "all",
  );

  useEffect(() => {
    // 너무 많은 양을 가져오게 되는 문제
    const commentQuery = query(
      collection(dbService(), "comments"),
      where("creatorId", "==", userObj.uid),
    );
    onSnapshot(commentQuery, (subSnapshot) => {
      setMyCommentsArr([]);
      subSnapshot.docs.forEach((doc) => {
        const commentId = doc.id;
        setMyCommentsArr((prev) => [...prev, commentId]);
      });
    });

    const contentsQuery = query(collection(dbService(), "contents"));
    onSnapshot(contentsQuery, (snapshot) => {
      setContents([]);
      snapshot.docs.forEach((doc) => {
        let contentArr = {};
        if (contentType === "myComments") {
          if (myCommentsArr.length === 0) return;
          if (!doc.data()?.comments || !doc.data().comments?.length > 0) return;
          for (let comment of doc.data().comments) {
            if (myCommentsArr.length !== 0 && myCommentsArr.includes(comment)) {
              contentArr = {
                ...doc.data(),
                id: doc.id,
              };
              break;
            }
          }
        } else {
          if (contentType === "myContents") {
            if (doc.data().creatorId !== userObj.uid) return;
          } else if (contentType === "myLikes") {
            if (!doc.data()?.likes || !doc.data().likes.includes(userObj.uid))
              return;
          }
          contentArr = {
            ...doc.data(), // creatorId, createdAt, text
            id: doc.id,
          };
        }
        setContents((prev) => [contentArr, ...prev]);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, userObj.uid, name]);

  const onContentType = ({ target: { name } }) => setContentType(name);

  return (
    <ContentsListStyle>
      {contentType !== "all" && (
        <ContentNav contentType={contentType} onContentType={onContentType} />
      )}

      {contents.length ? (
        contents
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
          })
          .map((content, i) => (
            <Content key={i + content.id} content={content} userObj={userObj} />
          ))
      ) : contents.length === 0 ? (
        <div id="emptyContent">아직 글이 없어요!😪</div>
      ) : (
        <LoadingBox text={"Loading"} />
      )}
    </ContentsListStyle>
  );
};

export default ContentsList;
