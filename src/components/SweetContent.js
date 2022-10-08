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
  sweetSizing,
  onCloseUpImg,
  onShowComment,
  showComment,
}) => (
  <SweetContentStyle>
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
      onShowComment={onShowComment}
      showComment={showComment}
    />
    {showComment && <SweetComment />}
  </SweetContentStyle>
);

export default SweetContent;
