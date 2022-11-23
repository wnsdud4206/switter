import {
  faArrowRight,
  faCamera,
  faCheck,
  faPlus,
  faUserPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfileEditorStyle from "styles/UserProfileEditorStyle";
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

const UserProfileEditor = ({ userObj, onEditing }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const fileInput = useRef();
  const [attachment, setAttachment] = useState(
    authService().currentUser.photoURL,
  );
  const [imgError, setImgError] = useState(false);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  const onChange = ({ target: { value } }) => setNewDisplayName(value);
  const onFocusText = () => {
    if (newDisplayName === userObj.displayName) {
      setNewDisplayName("");
    }
  };
  const onBlurText = () => {
    if (!newDisplayName) {
      setNewDisplayName(userObj.displayName);
    }
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
        displayName: newDisplayName || userObj.displayName,
      });
    } else {
      await updateProfile(authService().currentUser, {
        displayName: newDisplayName || userObj.displayName,
        photoURL: url,
      });
    }

    const { email, uid } = userObj;
    const newUserObj = {
      attachmentUrl: url || authService().currentUser.photoURL,
      displayName: newDisplayName,
      email: email,
      uid: uid,
    };
    const newUser = doc(dbService(), "users", userObj.uid);
    // eslint-disable-next-line no-unused-vars
    const docRef = await setDoc(newUser, newUserObj);

    // setAttachment(authService().currentUser.photoURL);
    // fileInput.current.value = authService().currentUser.photoURL;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      authService().currentUser.displayName !== newDisplayName ||
      authService().currentUser.photoURL !== attachment
    ) {
      const ok = window.confirm(
        "Are you sure you want to update your profile?",
      );
      if (ok) {
        try {
          // 기존 url과 새 url이 같다.
          if (authService().currentUser.photoURL === attachment) {
            updateProfileAndDoc();
            // 기존 url과 새 url이 다르다.
          } else if (authService().currentUser.photoURL !== attachment) {
            let attachmentUrl = "";

            // 존재하는 기존 url -> 새 url 혹은 빈 url
            if (authService().currentUser.photoURL) {
              // 새 url이 존재하면
              if (attachment !== "") {
                // if (authService().currentUser.photoURL) {
                const r = ref(
                  storageService(),
                  authService().currentUser.photoURL,
                );
                await deleteObject(r);
                // }

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

                // 새 url이 존재하지 않다면(빈 url)
              } else if (attachment === "") {
                const sure = window.confirm(
                  "Are you sure you want to update empty profile image?",
                );
                if (sure) {
                  // if (authService().currentUser.photoURL) {
                  const r = ref(
                    storageService(),
                    authService().currentUser.photoURL,
                  );
                  await deleteObject(r);
                  // }
                } else {
                  alert("please again profile update!");
                  return;
                }
              }

              updateProfileAndDoc(attachmentUrl);

              // 비어있는 기존 url
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
    // view모드 edit모드 구분(기본값 view)
    <UserProfileEditorStyle onSubmit={onSubmit}>
      <div id="profileEditBox">
        <div id="profileEditWrap">
          <div id="attachmentProfile">
            {attachment && !imgError && (
              <div id="selectImage">
                <label htmlFor="fileBtn">
                  <img
                    src={attachment}
                    width="150px"
                    height="150px"
                    alt="profileImage"
                    onError={onError}
                  />
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
              onChange={onChange}
              type="text"
              placeholder="Profile name to update"
              value={newDisplayName}
              onFocus={onFocusText}
              onBlur={onBlurText}
            />

            {/* 글자 수 제한, input이 아니라 textarea? */}
            <textarea
              id="introduce"
              type="text"
              placeholder="내 소개를 입력해 주세요."
            ></textarea>
          </div>
        </div>

        <div id="profileEditActionWrap">
          <button
            className="profileEditBtn"
            onClick={onEditing}
            title="editing"
          >
            취소
            {/* <FontAwesomeIcon icon={faUserPen} /> */}
          </button>
          <label htmlFor="submitBtn">
            확인
            {/* <FontAwesomeIcon icon={faCheck} /> */}
            <input id="submitBtn" type="submit" value="Update Profile" />
          </label>
        </div>
      </div>
    </UserProfileEditorStyle>
  );
};

export default UserProfileEditor;
