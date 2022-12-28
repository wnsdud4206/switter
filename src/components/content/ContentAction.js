import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faRegHeart,
  faComment as faRegCommnet,
} from "@fortawesome/free-regular-svg-icons";
import useGetLike from "hooks/useGetLike";
import onLikeToggle from "utils/onLikeToggle";
import IconButtonStyle from "styles/IconButtonStyle";

const ContentActionStyle = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

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

    & > span {
      margin: 0 2px;
      font-size: 1.1rem;
      font-weight: bold;
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
      }

      /* @media (min-width: 851px) {
        span.likeCounter {
          opacity: .2;

          transition: opacity 0.2s;
        }

        button.likeBtn:hover + span.likeCounter {
          opacity: 1;
        }
      } */
    }

    &.commentWrap {
      span.commentCounter {
      }

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
        {/* <IconButtonStyle */}
        <IconButtonStyle
          className="likeBtn"
          onClick={() => onLikeToggle(contentObj, currentUserLike)}
        >
          {currentUserLike ? (
            <FontAwesomeIcon className="userLike" icon={like} />
          ) : (
            <FontAwesomeIcon className="userNotLike" icon={faRegHeart} />
          )}
        </IconButtonStyle>
        {likeCount.length > 0 && (
          <span className="likeCounter">{likeCount.length}</span>
        )}
      </div>

      <div className="commentWrap">
        {contentObj.comments?.length > 0 && (
          <span className="commentCounter">{contentObj.comments.length}</span>
        )}
        <IconButtonStyle className="commentBtn" onClick={onContentBox}>
          <FontAwesomeIcon className="commentHidden" icon={faRegCommnet} />
        </IconButtonStyle>
      </div>
      {/* 공유버튼 추가?? */}
    </ContentActionStyle>
  );
};

export default ContentAction;
