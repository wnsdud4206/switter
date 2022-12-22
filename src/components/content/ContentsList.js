import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  dbService,
  collection,
  where,
  query,
  onSnapshot,
  doc,
  limit,
  orderBy,
} from "fbase";
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
    width: 96vw;
    padding: 32px 0;
  }
`;

const ContentsList = ({ userObj }) => {
  const { pathname } = useLocation();
  const { name } = useParams();
  const [contents, setContents] = useState([]);
  const [myCommentsArr, setMyCommentsArr] = useState([]);
  const [followUsers, setFollowUsers] = useState([]);
  const [contentType, setContentType] = useState(
    pathname.includes("profile") ? "myContents" : "allContents",
  );
  const [scrollLimitCount, setScrollLimitCount] = useState(10);

  useEffect(() => {
    // follow한 user들은 users에서 불러와야 하는데 조건문으로 contentType이 followContents로 구분되게 해야할듯

    // 너무 많은 양을 가져오게 되는 문제
    if (pathname.includes("profile")) {
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
    } else {
      const userDoc = doc(dbService(), "users", userObj.uid);
      onSnapshot(userDoc, (snapshot) => {
        setFollowUsers([...(snapshot.data()?.follow || [])]);
      });
    }

    const contentsQuery = query(
      collection(dbService(), "contents"),
      orderBy("at", "desc"),
      limit(scrollLimitCount),
    );
    onSnapshot(contentsQuery, (snapshot) => {
      setContents([]);
      let contentArr = [];
      snapshot.docs.forEach((doc) => {
        let contentObj = {};
        if (contentType === "myComments") {
          if (myCommentsArr.length === 0) return;
          if (!doc.data()?.comments || !doc.data().comments?.length > 0) return;
          for (let comment of doc.data().comments) {
            if (myCommentsArr.length !== 0 && myCommentsArr.includes(comment)) {
              contentObj = {
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
          } else if (contentType === "followContents") {
            if (!followUsers.includes(doc.data().creatorId)) return;
          }
          contentObj = {
            ...doc.data(), // creatorId, at, text
            id: doc.id,
          };
        }
        contentArr = [contentObj, ...contentArr];
      });
      setContents(contentArr);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, userObj.uid, name, scrollLimitCount]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const { innerHeight } = window;

        if ((scrollTop / (scrollHeight - innerHeight)) * 100 >= 100) {
          console.log((scrollTop / (scrollHeight - innerHeight)) * 100 >= 100);
          const contentCount = document.querySelectorAll(".content").length;

          setScrollLimitCount(contentCount + 10);
        }
      },
      true,
    );
  }, []);

  const onContentType = ({ target: { name } }) => setContentType(name);

  return (
    <ContentsListStyle>
      {
        <ContentNav
          category={
            pathname.includes("profile")
              ? [
                  { name: "myContents", text: "게시글" },
                  { name: "myLikes", text: "좋아하는 글" },
                  { name: "myComments", text: "댓글 쓴 글" },
                ]
              : [
                  { name: "allContents", text: "모든 게시글" },
                  { name: "followContents", text: "팔로우한 친구 글" },
                ]
          }
          contentType={contentType}
          onContentType={onContentType}
        />
      }

      {contents.length ? (
        contents
          .sort((a, b) => {
            if (a.at < b.at) return 1;
            if (a.at > b.at) return -1;
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
      {/* <div id="emptyContent">아직 글이 없어요!😪</div> */}
    </ContentsListStyle>
  );
};

export default ContentsList;
