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
import User from "components/User";

const ContentBox = ({ userObj }) => {
  const [imgError, setImgError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.boxState);
  const { likeCount, currentUserLike } = useGetLike(content);

  const onError = () => setImgError(true);

  const getComments = async () => {
    const commentsQuery = query(
      collection(dbService(), "comments"),
      where("contentId", "==", content.id),
    );
    const commentsSnap = await getDocs(commentsQuery);

    setComments([]);
    commentsSnap.docs.forEach(async (comment) => {
      try {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = ({ target: { value } }) => setCommentText(value);

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
        at: Date.now(),
        creatorId: userObj.uid,
        contentId: content.id,
      };

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
          {content.attachmentUrl?.length > 0 && (
            <div id="contentBoxImagesWrap">
              <div id="contentBoxImages">
                <div id="contentBoxImage">
                  <img
                    src={content.attachmentUrl[slideIndex]}
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
                <li id="creatorText">{content.text}</li>
                {comments?.length ? (
                  comments.map((comment) => (
                    <li key={comment.at}>
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
