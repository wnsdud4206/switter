import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boxActions } from "modules/contentBoxReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  dbService,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  query,
  collection,
  where,
} from "fbase";
import ContentBoxCommentActions from "./ContentBoxCommentActions";

const ContentBoxStyle = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  div#contentBackground {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    div#content {
      display: flex;
      flex-direction: row;

      // 임시, mobile에서는 다르게
      width: 87vw;
      height: 460px;

      border: 1px solid var(--border-color);
      border-radius: 8px;

      overflow: hidden;

      /* outline: 1px solid white; */

      & > div {
        height: 100%;
        // height 값은 flex grow로 준듯
      }
      div#contentBoxImagesWrap {
        width: 100%;

        position: relative;

        /* overflow: hidden; */

        border-right: 1px solid var(--border-color);

        div#contentBoxImages {
          height: 100%;

          div#contentBoxImage {
            display: flex;
            justify-content: center;
            align-items: center;

            background-color: var(--background-color);

            img {
              width: 100%;
              height: 460px;
              object-fit: contain;
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

          width: 28px;
          height: 28px;

          padding: 0;
          border-radius: 50%;
          box-sizing: border-box;

          position: absolute;
          top: 50%;

          transform: translateY(-100%);

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
          opacity: 0.7;

          &:hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }

      div#CommentBox {
        display: flex;
        flex-direction: column;

        background-color: var(--background-color);

        min-width: 405px;

        div#contentBoxHeader {
          display: flex;
          align-items: center;

          height: 42px;

          padding: 8px;
          border-bottom: 1px solid var(--border-color);

          div#contentBoxCreatorAttachment {
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

          span#contentBoxCreatorName {
            margin-left: 8px;

            cursor: pointer;
          }
        }

        div#commentsWrap {
          flex: 1;

          ul#commentsList {
            list-style: none;

            padding: 0 8px;

            li {
              display: flex;
              justify-content: space-between;

              &#emptyComment {
                text-align: center;
                padding: 32px 0;
              }

              div.comment {
                display: flex;
                align-items: center;

                img {
                  margin-right: 8px;
                }
              }

              // div.commentBtnWrap, ContentBoxCommentActions.js
            }
          }
        }

        div#commentFactory {
          padding: 12px 8px;
          border-top: 1px solid var(--border-color);

          form {
            display: flex;

            div#userImage {
              display: flex;
              align-items: flex-end;
              justify-content: center;

              min-width: 36px;
              height: 36px;

              /* background-color: white; */

              border-radius: 50%;
              /* border: 1px solid #00bdee; */
              box-sizing: border-box;

              overflow: hidden;

              img {
                width: 36px;
                height: 36px;
              }

              svg {
                color: var(--icon-color);

                width: 30px;
                height: 30px;
              }
            }

            input[type="text"] {
              background: none;
              outline: none;
              border: none;

              color: var(--sub-color);

              width: 100%;

              margin-left: 8px;
              border-bottom: 2px solid var(--sub-color);
              box-sizing: border-box;

              &:focus + label[for="commentSubmitBtn"] {
                svg {
                  display: none;
                }
                div#texting {
                  display: flex;
                }

                &:hover {
                  svg {
                    display: block;
                    transform: rotateZ(90deg);
                    transition: transform 0.2s;
                  }
                  div#texting {
                    display: none;
                  }
                }
              }
            }

            label[for="commentSubmitBtn"] {
              display: flex;
              align-items: center;
              justify-content: center;

              /* background-color: var(--icon-color); */

              min-width: 36px;
              height: 36px;

              border-top-left-radius: 50%;
              border-top-right-radius: 50%;
              border-bottom-right-radius: 50%;
              border: 2px solid var(--icon-color);
              box-sizing: border-box;
              /* border-radius: 50%; */

              cursor: pointer;

              &:hover > svg {
                transform: rotateZ(90deg);
              }

              svg {
                color: var(--icon-color);

                width: 20px;
                height: 20px;

                transition: transform 0.2s;
              }

              div#texting {
                display: none;
                align-items: center;
                gap: 3px;

                div.textingCircle {
                  width: 5px;
                  height: 5px;
                  background-color: var(--icon-color);
                  border-radius: 50%;

                  &.textingCircle1 {
                    animation: jump 1.2s 0.5s infinite alternate;
                  }
                  &.textingCircle2 {
                    animation: jump 1.2s 0.6s infinite alternate;
                  }
                  &.textingCircle3 {
                    animation: jump 1.2s 0.7s infinite alternate;
                  }

                  @keyframes jump {
                    0% {
                      transform: translateY(-3px);
                    }
                    20% {
                      transform: translate(0);
                    }
                    100% {
                      transform: translateY(0);
                    }
                  }
                }
              }

              input[type="submit"] {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;

const ContentBox = ({ userObj }) => {
  const [imgError, setImgError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.boxState);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const getComments = async () => {
    // const commentsDoc = doc(dbService(), "comments");
    const commentsQuery = query(
      collection(dbService(), "comments"),
      where("contentId", "==", content.id),
    );
    const commentsSnap = await getDocs(commentsQuery);

    setComments([]);
    commentsSnap.docs.forEach(async (comment) => {
      try {
        // console.log(comment.data());
        // 여기서 comment creator displayName 가져오기
        const usersRef = doc(dbService(), "users", comment.data().creatorId);
        const usersSnap = await getDoc(usersRef);

        const { attachmentUrl, displayName } = usersSnap.data();

        const commentObj = {
          ...comment.data(),
          id: comment.id,
          attachmentUrl,
          displayName,
        };
        setComments((prev) => [commentObj, ...prev]);
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCommentText(value);
  };

  const sliderBtn = (e, urlArr) => {
    if (e.target.className === "prev")
      slideIndex === 0
        ? setSlideIndex(urlArr.length - 1)
        : setSlideIndex((prev) => prev - 1);
    else if (e.target.className === "next")
      slideIndex === urlArr.length - 1
        ? setSlideIndex(0)
        : setSlideIndex((prev) => prev + 1);
    else console.error("slider button error");
  };

  const contentBoxCancel = (e) => {
    e.target.id === "contentBackground" && dispatch(boxActions.offContentBox());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentObj = {
        text: commentText,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        contentId: content.id,
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(dbService(), "comments"),
        commentObj,
      );

      const noticeDoc = doc(
        dbService(),
        "notifications",
        `${content.creatorId}`,
      );
      await setDoc(
        noticeDoc,
        {
          [content.id]: {
            contentComments: {
              [content.id + "/" + docRef.id]: {
                confirmed: false,
                lastUpdate: Date.now(),
                category: "contentComments",
              },
            },
          },
        },
        { merge: true },
      );

      // notification(
      //   "ADD",
      //   "contentComments",
      //   content.creatorId,
      //   content.id,
      //   null,
      //   docRef.id,
      // );

      setCommentText("");
      getComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentBoxStyle>
      <div id="contentBackground" onClick={contentBoxCancel}>
        <div id="content">
          {/* left */}
          {content.attachmentUrl?.length && (
            <div id="contentBoxImagesWrap">
              <div id="contentBoxImages">
                {/* {content.attachmentUrl.map((url, i) => (
                  <div
                    key={content.id + i}
                    // className={`contentImage ${i === slideIndex && "active"}`}
                    id="contentBoxImage"
                  >
                    <img
                      src={url}
                      width="100%"
                      height="100%"
                      alt="contentImage"
                    />
                  </div>
                ))} */}

                <div id="contentBoxImage">
                  <img
                    src={content.attachmentUrl[slideIndex]}
                    // width="100%"
                    // height="100%"
                    alt="contentImage"
                  />
                </div>
              </div>
              {content.attachmentUrl.length > 1 && (
                <>
                  <button
                    className="prev"
                    onClick={(e) => sliderBtn(e, content.attachmentUrl)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    className="next"
                    onClick={(e) => sliderBtn(e, content.attachmentUrl)}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* right */}
          <div id="CommentBox">
            <div id="contentBoxHeader">
              {/* <Link
            to={`/${isOwner ? "profile" : content.creatorId}`}
            onClick={() => {
              if (isOwner) {
                return;
              }
              getId(content.creatorId);
            }}
          > */}
              <div id="contentBoxCreatorAttachment">
                {content.creatorAttachmentUrl && !imgError ? (
                  <img
                    src={content.creatorAttachmentUrl}
                    width="40"
                    height="40"
                    alt="contentUserImage"
                    onError={onError}
                  />
                ) : (
                  <FontAwesomeIcon id="profileicon" icon={faUser} />
                )}
              </div>

              <span id="contentBoxCreatorName">
                <b>{content.creatorDisplayName}</b>
              </span>
              {/* </Link> */}
            </div>

            <div id="commentsWrap">
              <ul id="commentsList">
                {/* contents나 comments에 displayName도 저장하고 profile 수정할 때 contents, comments 의 displayName도 변경하게 끔 해야할 듯, 왜냐면 해당 content나 comment의 주인을 찾으려면 또 일일이 db를 가져오는 것이 번거로움(아래 댓글 작성자 부분) - 아냐 그럼 content랑 comment가 아주 많은 유저는 바꾸는 것이 너무 오래걸리거나 무거워 질 수도 있음 */}
                {comments?.length ? (
                  comments.map((comment) => (
                    <li key={comment.createdAt}>
                      <div className="comment">
                        {comment.attachmentUrl && !imgError ? (
                          <img
                            src={comment.attachmentUrl}
                            width="40"
                            height="40"
                            alt="commentImage"
                            onError={onError}
                          />
                        ) : (
                          <FontAwesomeIcon id="profileicon" icon={faUser} />
                        )}
                        <b>{comment.displayName}</b>&nbsp;{comment.text}
                      </div>

                      {comment.creatorId === userObj.uid && (
                        <ContentBoxCommentActions
                          userObj={userObj}
                          content={content}
                          comment={comment}
                          getComments={getComments}
                        />
                      )}
                    </li>
                  ))
                ) : (
                  <li id="emptyComment">아직 댓글이 없어요😥</li>
                )}
              </ul>
            </div>

            <div id="commentFactory">
              <form onSubmit={onSubmit}>
                <div id="userImage">
                  {userObj.photoURL ? (
                    <img
                      src={userObj.photoURL}
                      width="100%"
                      height="100%"
                      // width="32"
                      // height="32"
                      alt="userImage"
                    />
                  ) : (
                    <FontAwesomeIcon id="profileicon" icon={faUser} />
                  )}
                </div>

                <input
                  type="text"
                  value={commentText}
                  onChange={onChange}
                  placeholder="comment"
                  maxLength={120}
                  required
                />

                <label htmlFor="commentSubmitBtn">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <div id="texting">
                    <div className="textingCircle textingCircle1"></div>
                    <div className="textingCircle textingCircle2"></div>
                    <div className="textingCircle textingCircle3"></div>
                  </div>
                  <input id="commentSubmitBtn" type="submit" value="Comment" />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ContentBoxStyle>
  );
};

export default ContentBox;
