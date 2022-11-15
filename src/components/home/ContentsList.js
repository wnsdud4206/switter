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
import { editActions } from "modules/contentEditReducer";
import Content from "./Content";
import useGetContents from "hooks/useGetContents";

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
  const contents = useGetContents();

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
