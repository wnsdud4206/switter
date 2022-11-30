import {
  faChevronLeft,
  faChevronRight,
  faUser,
  faHeart as like,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boxActions } from "reducers/contentBoxReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  arrayUnion,
} from "fbase";
import ContentBoxCommentActions from "./ContentBoxCommentActions";
import useGetLike from "hooks/useGetLike";
import onLikeToggle from "utils/onLikeToggle";
import { Link } from "react-router-dom";
import ContentBoxStyle from "styles/content/ContentBoxStyle";


const ContentBox = ({ userObj }) => {
  const [imgError, setImgError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.boxState);
  const { likeCount, currentUserLike } = useGetLike(content);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  // useEffect onSnapshot 해야 좋을듯(async&await 없이)
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
    e.stopPropagation();
    e.target.className.includes("cancel") &&
      dispatch(boxActions.offContentBox());
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

      const noticeDoc = doc(dbService(), "notifications", content.creatorId);
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

      const contentsDoc = doc(dbService(), "contents", content.id);
      await setDoc(
        contentsDoc,
        {
          comments: arrayUnion(docRef.id),
        },
        { merge: true },
      );

      setCommentText("");
      getComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentBoxStyle>
      <div id="contentBackground" className="cancel" onClick={contentBoxCancel}>
        <div id="content">
          {/* left */}
          <div id="contentBoxImagesWrap">
            {content.attachmentUrl?.length ? (
              <>
                <div id="contentBoxImages">
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
              </>
            ) : (
              <div id="noImage">
                <p>이미지가 없는 글입니다😉</p>
              </div>
            )}
          </div>

          {/* right */}
          <div id="CommentBox">
            <div id="contentBoxHeader">
              <div id="contentCreator">
                <Link
                  className="creatorLink cancel"
                  to={`/profile/${content.creatorDisplayName}`}
                  onClick={contentBoxCancel}
                >
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
                </Link>
              </div>

              <div className="likeWrap">
                <span className="likeCounter">{likeCount.length}</span>
                <button
                  className="likeBtn"
                  onClick={() => onLikeToggle(content, currentUserLike)}
                >
                  {currentUserLike ? (
                    <FontAwesomeIcon className="userLike" icon={like} />
                  ) : (
                    <FontAwesomeIcon
                      className="userNotLike"
                      icon={faRegHeart}
                    />
                  )}
                </button>
              </div>
            </div>

            <div id="commentsWrap">
              <ul id="commentsList">
                {/* contents나 comments에 displayName도 저장하고 profile 수정할 때 contents, comments 의 displayName도 변경하게 끔 해야할 듯, 왜냐면 해당 content나 comment의 주인을 찾으려면 또 일일이 db를 가져오는 것이 번거로움(아래 댓글 작성자 부분) - 아냐 그럼 content랑 comment가 아주 많은 유저는 바꾸는 것이 너무 오래걸리거나 무거워 질 수도 있음 */}
                <li id="creatorText">{content.text}</li>
                {comments?.length ? (
                  comments.map((comment) => (
                    <li key={comment.createdAt}>
                      <div className="comment">
                        <Link
                          className="commentLink cancel"
                          to={`/profile/${comment.displayName}`}
                          onClick={contentBoxCancel}
                        >
                          <div className="commentUserImage">
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
                          </div>
                          <span className="commentUserName">
                            <b>{comment.displayName}</b>
                          </span>
                        </Link>
                        <span className="commentUserText">
                          &nbsp;{comment.text}
                        </span>
                      </div>

                      <ContentBoxCommentActions
                        userObj={userObj}
                        content={content}
                        comment={comment}
                        getComments={getComments}
                      />
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
