import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import { editActions } from "store/contentEditStore";
import Content from "./Content";

const ContentsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  background-color: #222;

  /* flex-basis: 470px; */
  width: 470px;
  padding: 32px 32px 32px 0;
  /* box-sizing: border-box; */

  div.content {
    width: 100%;
    /* height: 500px; */

    border: 1px solid white;
    box-sizing: border-box;

    div.contentHeader {
      display: flex;
      align-items: center;

      padding: 8px;

      outline: 1px solid white;

      div.creatorAttachment {
        display: flex;
        align-items: flex-end;
        justify-content: center;

        width: 40px;
        height: 40px;

        border-radius: 50%;
        overflow: hidden;

        cursor: pointer;

        img {
        }

        svg {
          font-size: 32px;
        }
      }

      span.creatorName {
        margin-left: 8px;

        cursor: pointer;
      }
    }

    div.contentImagesWrap {
      position: relative;

      overflow: hidden;

      outline: 1px solid orange;

      div.contentImages {
        display: flex;
        align-items: center;

        background-color: #444;

        transform: translateX(-468px);

        outline: 1px solid red;

        // prev, next button

        div.contentImage {
          /* display: none; */
          display: block;

          // 하단 여백 제거하기
          // height 크기 고정 - display none으로 해서 그런듯
          // insta에서는 display flex row, translate로 줌

          img {
          }

          &.active {
            display: block;
          }
        }
      }
      button {
        outline: none;
        background: none;
        border: none;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #aaa;

        width: 24px;
        height: 24px;

        padding: 0;
        border-radius: 50%;
        box-sizing: border-box;

        position: absolute;
        top: 50%;

        opacity: 0;

        transition: all 0.2s;

        cursor: pointer;

        &.prev {
          left: 0;
        }
        &.next {
          right: 0;
        }

        svg {
          font-size: 16px;

          pointer-events: none;
        }
      }

      &:hover button {
        opacity: 0.5;

        &:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }

    div.contentText {
      padding: 8px;
    }

    div.contentActions {
    }

    div.contentComments {
      padding: 8px;
    }
  }
`;

const ContentsList = () => {
  const [contents, setContents] = useState([]);
  // slideIndex가 각각의 값이 있는게 아니라 모두에게 적용됨 - attachment 부분만 component화해서 나눠야 할듯

  // 읽기, 데이터 받아오기
  const getContents = async () => {
    try {
      // const dbContents = await getDocs(
      //   collection(dbService(), "contents"),
      //   // orderBy("createdAt", "desc"),
      // );
      // setContents([]);
      // dbContents.forEach(async (content) => {
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
          // console.log(content.id);
          // console.log(dbComment.docs[0].data());
          // dbComment.forEach((comment) => {
          //   console.log(comment.data());
          // })

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
          // 왜 자꾸 뒤죽박죽으로 받아오지?? 저장할 때 뒤죽박죽인건가? - orderBy 로 정리
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

  // useEffect(() => {
  //   console.log(slideIndex);
  // }, [slideIndex]);

  return (
    <ContentsListStyle>
      {contents.length &&
        contents
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
          })
          .map((content, i) => (
            <Content key={i + content.id} content={content} />
          ))}
    </ContentsListStyle>
  );
};

export default ContentsList;
