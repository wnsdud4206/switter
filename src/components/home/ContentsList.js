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

const ContentsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  /* flex-basis: 470px; */
  width: 470px;
  padding: 32px 32px 32px 0;
  /* box-sizing: border-box; */

  nav#contentNav {
    width: 100%;

    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 12px 8px;
    box-sizing: border-box;

    ul#contentMenu {
      list-style: none;
      padding: 0;
      margin: 0;

      display: flex;
      justify-content: space-between;

      li {
        button {
          outline: none;
          background: none;
          border: none;

          color: var(--sub-color);

          cursor: pointer;
        }

        &#myContents {
          button#myContentsBtn {
          }
        }
        &#myLikeContents {
          button#myLikeContentsBtn {
          }
        }
        &#myCommentContents {
          button#myCommentContentsBtn {
          }
        }
      }
    }
  }

  @media (max-width: 850px) {
    padding: 32px 0;
  }
`;

const ContentsList = ({ userObj }) => {
  // const contents = useGetContents();
  const { pathname } = useLocation();
  const [contents, setContents] = useState([]);
  const [contentType, setContentType] = useState(
    pathname.includes("profile") ? "myContents" : "all",
  );

  // 이제 contents에서 comments, likes 그리고 comments에서 likes를 가져올 수 있다.

  useEffect(() => {
    const contentsQuery = query(
      collection(dbService(), "contents"),
      // orderBy("createdAt", "desc"), // 순서 정렬, 최신 sweet이 위에서 쌓이게 하고 싶기 때문에 "desc" 추가
    );
    onSnapshot(contentsQuery, (snapshot) => {
      let contentArr = {};
      if (contentType === "all") {
        contentArr = snapshot.docs.map((doc) => ({
          ...doc.data(), // creatorId, createdAt, text
          id: doc.id,
        }));
      } else if (contentType === "myContents") {
        // contentArr = snapshot.docs.map(
        //   (doc) =>
        //     doc.data().creatorId === userObj.uid && {
        //       ...doc.data(), // creatorId, createdAt, text
        //       id: doc.id,
        //     },
        // );
        contentArr = snapshot.docs.map((doc) => ({
          ...doc.data(), // creatorId, createdAt, text
          id: doc.id,
        }));
      }
      setContents(contentArr);
    });
  }, []);

  const onContentType = (e) => {
    const type = e.target.name;
    setContentType(type);
  };

  return (
    <ContentsListStyle>
      {contentType !== "all" && (
        <nav id="contentNav">
          <ul id="contentMenu">
            <li id="myContents">
              <button
                id="myContentsBtn"
                name="myContents"
                onClick={onContentType}
              >
                내가 쓴 글
              </button>
            </li>
            <li id="myLikeContents">
              <button
                id="myLikeContentsBtn"
                name="myLikes"
                onClick={onContentType}
              >
                내가 좋아요한 글
              </button>
            </li>
            <li id="myCommentContents">
              <button
                id="myCommentContentsBtn"
                name="myComments"
                onClick={onContentType}
              >
                내가 댓글 단 글
              </button>
            </li>
            <li id="myProfile">
              <button
                id="myProfileBtn"
                name="myProfile"
                onClick={onContentType}
              >
                내 프로필 정보
              </button>
            </li>
          </ul>
        </nav>
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
      ) : (
        <LoadingBox text={"Loading"} />
      )}
    </ContentsListStyle>
  );
};

export default ContentsList;
