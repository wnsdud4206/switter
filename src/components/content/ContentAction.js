import { useEffect, useState } from "react";
import {
  dbService,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
  query,
  onSnapshot,
  orderBy,
  authService,
  deleteField,
  arrayUnion,
  arrayRemove,
} from "fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as like,
  faComment as comment,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faRegHeart,
  faComment as faRegCommnet,
} from "@fortawesome/free-regular-svg-icons";
import useGetLike from "hooks/useGetLike";
import onLikeToggle from "utils/onLikeToggle";

const ContentActionStyle = styled.div`
  display: flex;
  justify-content: space-between;

  /* background-color: var(--background-color); */

  padding: 8px;

  div {
    display: flex;
    justify-content: center;

    button {
      background: none;
      outline: none;
      border: none;
      padding: 0;

      cursor: pointer;

      svg {
        font-size: 22px;
      }
    }

    &.likeWrap {
      button.likeBtn {
        svg.userLike {
          color: #ff6633;
        }
        svg.userNotLike {
          color: var(--sub-color);
        }
      }

      span.likeCounter {
        margin: 0 8px;
        font-size: 1.2rem;
      }
    }

    &.commentWrap {
      button.commentBtn {
        svg {
          color: var(--sub-color);
        }
      }
    }
  }
`;

const ContentAction = ({ contentObj, onContentBox }) => {

  const { likeCount, currentUserLike } = useGetLike(contentObj);


  return (
    <ContentActionStyle className="contentActions">
      <div className="likeWrap">
        <button
          className="likeBtn"
          onClick={() => onLikeToggle(contentObj, currentUserLike)}
        >
          {currentUserLike ? (
            <FontAwesomeIcon className="userLike" icon={like} />
          ) : (
            <FontAwesomeIcon className="userNotLike" icon={faRegHeart} />
          )}
        </button>
        <span className="likeCounter">{likeCount.length}</span>
      </div>

      <div className="commentWrap">
        {/* <span className="commentCounter">{commentCount.length}</span> */}
        <button className="commentBtn" onClick={onContentBox}>
          {/* 이전처럼 comment가 열리고 닫히는게 아니라 comment의 존재여부로 icon 다르게 주기 */}
          {/* {commentCount.length ? (
            <FontAwesomeIcon className="commentShow" icon={comment} />
          ) : (
            <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
          )} */}
          <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
        </button>
      </div>
      {/* 공유버튼 추가, 해당 content가 열려있는 url주소 복사 */}
    </ContentActionStyle>
  );
};

export default ContentAction;
