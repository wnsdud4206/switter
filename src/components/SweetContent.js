import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import SweetActoins from "./SweetActions";
import SweetComment from "./SweetComment";
import SweetContentStyle from "styles/SweetContentStyle";

const SweetContent = ({
  userName,
  isOwner,
  onEditing,
  onDeleteClick,
  sweetObj,
  userObj,
  sweetSizing,
  onCloseUpImg,
  sweetContentRef,
  onScrollComment,
  scrollComment,
  showComment,
}) => {
  return (
    <>
      <SweetContentStyle ref={sweetContentRef}>
        <div className="nameAndBtn">
          <span>{userName}</span>
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
        <p>{sweetObj.text}</p>
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
          sweetObj={sweetObj}
          onScrollComment={onScrollComment}
          scrollComment={scrollComment}
        />
      </SweetContentStyle>

      {/* showComment를 늦추는 수 밖에 */}
      {showComment && (
        <SweetComment sweetObj={sweetObj} userObj={userObj} />
      )}
    </>
  );
};

export default SweetContent;
