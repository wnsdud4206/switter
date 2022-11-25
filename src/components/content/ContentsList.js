import React, { useCallback, useEffect, useState } from "react";
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
import styled from "styled-components";
import LoadingBox from "components/loading/LoadingBox";
import Content from "./Content";
import { useLocation, useParams } from "react-router-dom";
import ContentNav from "./ContentNav";
import UserProfile from "components/UserProfileEditor";

const ContentsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  /* flex-basis: 470px; */
  width: 470px;
  padding: 32px 32px 32px 0;
  /* box-sizing: border-box; */

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
  // const contents = useGetContents();
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

    const contentsQuery = query(
      collection(dbService(), "contents"),
      // orderBy("createdAt", "desc"), // 순서 정렬, 최신 sweet이 위에서 쌓이게 하고 싶기 때문에 "desc" 추가
    );
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

  const onContentType = ({ target: { name } }) => {
    const type = name;
    setContentType(type);
  };

  return (
    <ContentsListStyle>
      {contentType !== "all" && <ContentNav contentType={contentType} onContentType={onContentType} />}

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

      {/* 컨텐츠가 없을 경우에도 loding화면이 나와서 컨텐츠가 없을 때와 로딩중일 때의 구분을 해야함 */}
    </ContentsListStyle>
  );
};

export default ContentsList;
