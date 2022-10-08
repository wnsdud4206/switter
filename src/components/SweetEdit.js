import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SweetEditStyle from "styles/SweetEditStyle";

const SweetEdit = ({
  onSubmit,
  offEditing,
  newSweetText,
  onChange,
  attachment,
  sweetSizing,
  onClearAttachmentClick,
  onFileChange,
  fileInput
}) => (
  // profile image 변경 추가
  <>
    {/* 왜 form안에 넣어줬지? input은 무조건 form 안에 있어야 하나? */}
    <SweetEditStyle onSubmit={onSubmit}>
      {/* required는 아무것도 입력하지 않고 제출하면 경고창이 뜨게 해주는 속성 */}
      <div className="textEditWrap">
        {/* <input
        type="text"
        placeholder="Edit your sweet"
        value={newSweetText}
        onChange={onChange}
        required
      /> */}
        <div className="btnWrap">
          <label>
            <FontAwesomeIcon icon={faPencil} />
            <input type="submit" value="Update Sweet" />
          </label>
          <button onClick={offEditing}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="paddingBox">
          <textarea
            placeholder="Edit your sweet"
            value={newSweetText}
            onChange={onChange}
            maxLength="1200"
            autoFocus
          ></textarea>
        </div>
      </div>

      {attachment && (
        <div className="sweetImg">
          <img
            src={attachment}
            width="100%"
            height="100%"
            alt="sweetImage"
            onLoad={sweetSizing}
          />
          <button onClick={onClearAttachmentClick}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}

      <label htmlFor="sweetUpdatefileBtn">
        Edit photo
        <FontAwesomeIcon icon={faPlus} />
        <input
          className="sweetUpdatefileBtn"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
      </label>
    </SweetEditStyle>
  </>
);

export default SweetEdit;
