import React, { useRef, useState } from "react";
import {
  doc,
  updateDoc,
  dbService,
  storageService,
  ref,
  deleteObject,
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import SweetEditStyle from "styles/SweetEditStyle";

const SweetEdit = ({
  sweetObj,
  offEditing,
  newSweetText,
  onChange,
  sweetSizing,
}) => {
  const [attachment, setAttachment] = useState(sweetObj.attachmentUrl);

  const fileInput = useRef();

  // async&await는 써도되고 안써도 된다. 어떤 방법을 써도 snapshot 덕분에 업데이트는 확인할 수 있기 때문이다.
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (sweetObj.attachmentUrl && sweetObj.attachmentUrl !== attachment) {
        const r = ref(storageService(), sweetObj.attachmentUrl);
        await deleteObject(r);
      }

      const d = doc(dbService(), "sweets", `${sweetObj.id}`);
      await updateDoc(d, { text: newSweetText, attachmentUrl: attachment });

      offEditing();
    } catch (error) {
      console.error(error);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // onloadend에 finishedEvent의 result를 setAttachment로 설정해주는 것
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };

  return (
    // profile image 변경 추가
    <>
      {/* 왜 form안에 넣어줬지? input은 무조건 form 안에 있어야 하나? */}
      <SweetEditStyle onSubmit={onSubmit}>
        {/* required는 아무것도 입력하지 않고 제출하면 경고창이 뜨게 해주는 속성 */}
        <div className="sweetEditHeader">
          <input
            type="text"
            placeholder="Edit your sweet color"
            value={newSweetText}
            onChange={onChange}
            required
          />
          <div className="btnWrap">
            <label>
              <FontAwesomeIcon icon={faPencil} />
              <input type="submit" value="Update Sweet" />
            </label>
            <button className="sweetEditCancel" onClick={offEditing}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
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
            id="sweetUpdatefileBtn"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
          />
        </label>
      </SweetEditStyle>
    </>
  );
};

export default SweetEdit;
