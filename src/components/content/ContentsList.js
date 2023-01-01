import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  dbService,
  collection,
  where,
  query,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
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
    align-items: center;

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

  // myLikes Test
  // useEffect(() => {
  //   const contentsQuery = query(
  //     collection(dbService(), "contents"),
  //     where("creatorId", "in", [
  //       "1AMsq8Dcpld9BqbH6b3VAsChLCq2",
  //       "XCiblkEpbhhDbIP2IbyJh5fTAhG3",
  //     ]),
  //     orderBy("at", "desc"),
  //     limit(scrollLimitCount),
  //   );
  //   onSnapshot(contentsQuery, (snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       console.log(doc.data().at);
  //     });
  //   });
  // }, []);

  const getContents = async () => {
    try {
      // 너무 많은 양을 가져오게 되는 문제
      if (pathname.includes("profile")) {
        const commentQuery = query(
          collection(dbService(), "comments"),
          where("creatorId", "==", userObj.uid),
        );
        const commentSnapshot = await getDocs(commentQuery);
        setMyCommentsArr([]);
        commentSnapshot.forEach((snapshot) => {
          const commentId = snapshot.id;
          setMyCommentsArr((prev) => [...prev, commentId]);
        });
      } else {
        const userDoc = doc(dbService(), "users", userObj.uid);
        const userSnapshot = await getDoc(userDoc);
        setFollowUsers([...(userSnapshot.data()?.follow || [])]);
      }

      if (contentType === "myComments" && !(myCommentsArr > 0)) {
        setContents([]);
        return;
      }

      const contentsQuery =
        contentType === "allContents"
          ? query(
              collection(dbService(), "contents"),
              orderBy("at", "desc"),
              limit(scrollLimitCount),
            )
          : query(
              collection(dbService(), "contents"),
              orderBy("at", "desc"),
              contentType === "followContents"
                ? where("creatorId", "in", followUsers)
                : contentType === "myContents"
                ? where("creatorId", "==", userObj.uid)
                : contentType === "myComments"
                ? where("comments", "array-contains-any", myCommentsArr)
                : where("likes", "array-contains", userObj.uid),
              limit(scrollLimitCount),
            );
      // where가 자꾸 안들어감.. contentType state에 아예 넣어줘야 할듯?
      // 맨 처음 10개를 무작위로 불러오는데 해당 유저의 uid와 겹쳐지는 doc이 10개 보다 덜 할거나 없을 수 있어서 다음 scroll해서 불러오는것이 문제가됨, 애초에 where로 "creatorId", "==", userObj.uid 를 해주면 좋겠지만 그렇게 되면 myComments에서 문제가 생길듯 함 봐야겠다.
      // contentType에 따라 orderBy와 where를 다른 조건으로 줘서 해당 조건에 맞는 document들만 가져오게끔 해야함(orderBy를 바꿀 필요 없나?)
      const contentsSnapshot = await getDocs(contentsQuery);
      setContents([]);
      contentsSnapshot.docs.forEach((snapshot) => {
        const contentObj = {
          ...snapshot.data(),
          id: snapshot.id,
        };

        setContents((prev) => [contentObj, ...prev]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // follow한 user들은 users에서 불러와야 하는데 조건문으로 contentType이 followContents로 구분되게 해야할듯

    getContents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, userObj.uid, name, scrollLimitCount]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const { innerHeight } = window;

        if ((scrollTop / (scrollHeight - innerHeight)) * 100 >= 100) {
          // console.log((scrollTop / (scrollHeight - innerHeight)) * 100 >= 100);
          const contentCount = document.querySelectorAll(".content").length;
          console.log(contentCount < scrollLimitCount);

          if (contentCount < scrollLimitCount) return;

          setScrollLimitCount(contentCount + 10);
        }
      },
      true,
    );
  }, []);

  const onContentType = ({ target: { name } }) => {
    setScrollLimitCount(10);
    setContentType(name);
  };

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

export default React.memo(ContentsList);
