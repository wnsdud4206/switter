import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import SweetActoins from "./SweetActions";
import SweetComment from "./comment/SweetComment";
import SweetContentStyle from "styles/sweet/SweetContentStyle";
import { Link } from "react-router-dom";

const SweetContent = ({
  userName,
  userAttachmentUrl,
  isOwner,
  onEditing,
  onDeleteClick,
  sweetObj,
  userObj,
  sweetSizing,
  onCloseUpImg,
  sweetContentRef,
  onScrollComment,
  offScrollComment,
  scrollComment,
  showComment,
  comments,
  onCommentEditResizeToggle,
  // offCommentEditResize,
  getId,
  // onOnlySweet,
}) => {
  const [imgError, setImgError] = useState(false);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  return (
    <>
      <SweetContentStyle className="sweetContent" ref={sweetContentRef}>
        <div className="sweetHeader">
          <div className="userWrap">
            <Link
              to={`/${isOwner ? "profile" : sweetObj.creatorId}`}
              onClick={() => {
                if (isOwner) {
                  return;
                }
                getId(sweetObj.creatorId);
              }}
            >
              <div className="sweetUserImage">
                {userAttachmentUrl && !imgError ? (
                  <img
                    src={userAttachmentUrl}
                    // width="100%"
                    // height="100%"
                    width="40"
                    height="40"
                    alt="sweetUserImage"
                    onError={onError}
                  />
                ) : (
                  <FontAwesomeIcon id="profileicon" icon={faUser} />
                )}
              </div>

              <span>{userName}</span>
            </Link>
          </div>

          {isOwner && (
            <div className="btnWrap">
              <button className="editBtn" onClick={onEditing}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button className="deleteBtn" onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
        {/* <div className="sweetText" onClick={onOnlySweet}> */}
        <div className="sweetText">
          <p>{sweetObj.text}</p>
        </div>
        {sweetObj.attachmentUrl && (
          <div className="sweetImg">
            <img
              src={sweetObj.attachmentUrl}
              width="100%"
              height="100%"
              alt="sweetImage"
              onLoad={sweetSizing}
              onClick={onCloseUpImg}
            />
          </div>
        )}
        <SweetActoins
          userObj={userObj}
          sweetObj={sweetObj}
          onScrollComment={onScrollComment}
          offScrollComment={offScrollComment}
          scrollComment={scrollComment}
          commentCount={comments.length}
        />
      </SweetContentStyle>

      {/* showComment를 늦추는 수 밖에 */}
      {showComment && (
        <SweetComment
          sweetObj={sweetObj}
          userObj={userObj}
          comments={comments}
          onCommentEditResizeToggle={onCommentEditResizeToggle}
          // offCommentEditResize={offCommentEditResize}
          getId={getId}
        />
      )}
    </>
  );
};

export default SweetContent;