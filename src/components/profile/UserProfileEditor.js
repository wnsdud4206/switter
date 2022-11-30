import { faCamera, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfileEditorStyle from "styles/profile/UserProfileEditorStyle";
import {
  authService,
  dbService,
  updateProfile,
  doc,
  setDoc,
  ref,
  storageService,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "fbase";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const UserProfileEditor = ({ userObj, onEditing }) => {
  const [text, setText] = useState({
    displayName: userObj.displayName,
    introduce: userObj?.introduce || "",
  });
  const [attachment, setAttachment] = useState(
    authService().currentUser.photoURL,
  );
  const [imgError, setImgError] = useState(false);
  const fileInput = useRef();
  const navigate = useNavigate();

  const onError = () => setImgError(true);

  const onChange = ({ target: { className, value } }) =>
    setText((prev) => ({
      ...prev,
      [className]: value,
    }));

  const onFocusText = ({ target: { className } }) => {
    if (
      className === "displayName" &&
      text.displayName === userObj?.displayName
    )
      setText((prev) => ({ ...prev, [className]: "" }));
    else if (className === "introduce" && text.introduce === userObj?.introduce)
      setText((prev) => ({ ...prev, [className]: "" }));
  };
  const onBlurText = ({ target: { className } }) => {
    if (className === "displayName" && !text.displayName)
      setText((prev) => ({
        ...prev,
        [className]: userObj.displayName,
      }));
    else if (className === "introduce" && !text.introduce)
      setText((prev) => ({
        ...prev,
        [className]: userObj?.introduce || "",
      }));
  };

  const onPhotoChange = ({ target: { files } }) => {
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
    setAttachment("");
    fileInput.current.value = "";
  };

  const updateProfileAndDoc = async (url) => {
    if (url === undefined) {
      await updateProfile(authService().currentUser, {
        displayName: text.displayName || userObj.displayName,
      });
    } else {
      await updateProfile(authService().currentUser, {
        displayName: text.displayName || userObj.displayName,
        photoURL: url,
      });
    }

    const { email, uid } = userObj;
    const newUserObj = {
      attachmentUrl: url || authService().currentUser.photoURL,
      displayName: text.displayName,
      email,
      introduce: text.introduce,
      uid,
    };
    const newUser = doc(dbService(), "users", userObj.uid);
    // eslint-disable-next-line no-unused-vars
    const docRef = await setDoc(newUser, newUserObj, { merge: true });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      authService().currentUser?.displayName !== text.displayName ||
      authService().currentUser?.photoURL !== attachment ||
      authService().currentUser?.introduce !== text.introduce
    ) {
      const ok = window.confirm(
        "Are you sure you want to update your profile?",
      );
      if (ok) {
        try {
          if (authService().currentUser.photoURL === attachment) {
            updateProfileAndDoc();
          } else if (authService().currentUser.photoURL !== attachment) {
            let attachmentUrl = "";

            if (authService().currentUser.photoURL) {
              if (attachment !== "") {
                const r = ref(
                  storageService(),
                  authService().currentUser.photoURL,
                );

                await deleteObject(r);

                const attachmentRef = ref(
                  storageService(),
                  `${userObj.uid}/profileImages/${uuidv4()}`,
                );
                // eslint-disable-next-line no-unused-vars
                const response = await uploadString(
                  attachmentRef,
                  attachment,
                  "data_url",
                );

                attachmentUrl = await getDownloadURL(attachmentRef);
              } else if (attachment === "") {
                const sure = window.confirm(
                  "Are you sure you want to update empty profile image?",
                );
                if (sure) {
                  const r = ref(
                    storageService(),
                    authService().currentUser.photoURL,
                  );

                  await deleteObject(r);
                } else {
                  alert("please again profile update!");
                  return;
                }
              }

              updateProfileAndDoc(attachmentUrl);

            } else {
              const attachmentRef = ref(
                storageService(),
                `${userObj.uid}/profileImages/${uuidv4()}`,
              );

              // eslint-disable-next-line no-unused-vars
              const response = await uploadString(
                attachmentRef,
                attachment,
                "data_url",
              );

              attachmentUrl = await getDownloadURL(attachmentRef);

              updateProfileAndDoc(attachmentUrl);
            }
          }

          onEditing();
          navigate(`/profile/${text.displayName}`, { replace: true });
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      alert("수정된 정보가 없습니다.");
      return;
    }
  };

  return (
    <UserProfileEditorStyle onSubmit={onSubmit}>
      <div id="profileEditWrap">
        <div id="attachmentProfile">
          {attachment && !imgError && (
            <div id="selectImage">
              <label htmlFor="fileBtn">
                {attachment && !imgError ? (
                  <img
                    src={attachment}
                    width="150px"
                    height="150px"
                    alt="profileImage"
                    onError={onError}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="profileAttachmenticon"
                    icon={faUser}
                  />
                )}
                <div className="changeIconWrap">
                  <FontAwesomeIcon icon={faCamera} title="changeImage" />
                </div>
                <input
                  id="fileBtn"
                  type="file"
                  accept="image/*"
                  onChange={onPhotoChange}
                  ref={fileInput}
                />
              </label>
              <button id="attachmentRemoveBtn" onClick={onClearAttachmentClick}>
                <FontAwesomeIcon icon={faXmark} title="cancelImage" />
              </button>
            </div>
          )}
        </div>

        <div id="textProfile">
          <input
            className="displayName"
            type="text"
            placeholder="Profile name to update"
            value={text.displayName}
            onChange={onChange}
            onFocus={onFocusText}
            onBlur={onBlurText}
            maxLength="10"
            required
          />

          <textarea
            className="introduce"
            type="text"
            placeholder="내 소개를 입력해 주세요."
            value={text.introduce}
            onChange={onChange}
            onFocus={onFocusText}
            onBlur={onBlurText}
            maxLength="120"
          ></textarea>

          <div id="profileEditActionWrap">
            <button
              className="profileEditBtn"
              onClick={onEditing}
              title="editing"
            >
              취소
            </button>
            <label htmlFor="submitBtn">
              확인
              <input id="submitBtn" type="submit" value="Update Profile" />
            </label>
          </div>
        </div>
      </div>
    </UserProfileEditorStyle>
  );
};

export default UserProfileEditor;
