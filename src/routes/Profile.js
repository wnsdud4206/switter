import {
  faArrowRight,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  authService,
  dbService,
  signOut,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  updateProfile,
  doc,
  setDoc,
  ref,
  storageService,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileStyle, LogOutBtnStyle } from "styles/ProfileStyle";
import { v4 as uuidv4 } from "uuid";

const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  // const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newDisplayName, setNewDisplayName] = useState("");
  const fileInput = useRef();
  const [attachment, setAttachment] = useState("");
  const onLogOutClick = () => {
    signOut(authService());
    navigate("/", { replace: true });
  };

  const getMySweets = async () => {
    const q = query(
      collection(dbService(), "sweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt"),
    );
    // eslint-disable-next-line no-unused-vars
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    // });
  };
  useEffect(() => {
    getMySweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = ({ target: { value } }) => setNewDisplayName(value);
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
  const onSubmit = async (event) => {
    event.preventDefault();
    /*
    // 강의
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
    */

    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoURL !== attachment
    ) {
      const ok = window.confirm(
        "Are you sure you want to update your profile?",
      );
      if (ok) {
        // 기존 profile image 지우기, 현재 image url(userObj.photoURL)을 storage 안에서 자동으로 찾아 지우는 듯

        try {
          // 현재 내 프로필의 유무와 선택한 이미지파일 유무에 따라 storage에 저장할지 여부를 결정
          let attachmentUrl = "";
          if (attachment !== "") {
            if (authService().currentUser.photoURL) {
              const r = ref(
                storageService(),
                authService().currentUser.photoURL,
              );
              await deleteObject(r);
            }

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
          } else {
            const sure = window.confirm(
              "Are you sure you want to update empty profile image?",
            );
            if (sure) {
              if (authService().currentUser.photoURL) {
                const r = ref(
                  storageService(),
                  authService().currentUser.photoURL,
                );
                await deleteObject(r);
              }
            } else {
              alert("please again profile update!");
              return;
            }
          }

          // 5-2. 댓글 참고 수정 전 주석처리
          // 지금 상황에 이걸로 하면 getitorken?이 필요하다고 하는데 현재 userObj에는 App.js에서 내가 필요한 정보들만(displayName, photoURL, email, .. 등등) 있기 때문에 getitorken 뭐시기를 못찾아서 문제가 생긴다. 그래서 아래코드(authService().currentUser)로 사용
          // await updateProfile(userObj, {
          //   displayName: newDisplayName,
          //   photoURL: attachmentUrl,
          // });
          // auth 정보 수정
          await updateProfile(authService().currentUser, {
            displayName: newDisplayName,
            photoURL: attachmentUrl,
          });
          // refreshUser();
          // 이렇게 했을 때 App.js의 setUserObj에 updateProfile을 새로 선언해주지 않아도 정상동작한다고 한다.

          const { email, uid } = userObj;
          const newUserObj = {
            attachmentUrl,
            displayName: newDisplayName,
            email: email,
            uid: uid,
          };
          const newUser = doc(dbService(), "users", userObj.uid);
          // eslint-disable-next-line no-unused-vars
          const docRef = await setDoc(newUser, newUserObj);

          setAttachment(""); // 미리보기 사진 제거
          fileInput.current.value = ""; // 올리고 선택된 파일 해제
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <ProfileStyle onSubmit={onSubmit}>
        <fieldset>
          <input
            onChange={onChange}
            type="text"
            placeholder="Profile name to update"
            value={newDisplayName}
          />
          <label htmlFor="submitBtn">
            <FontAwesomeIcon icon={faArrowRight} />
            <input id="submitBtn" type="submit" value="Update Profile" />
          </label>
        </fieldset>
        <label htmlFor="fileBtn">
          Change photo
          <FontAwesomeIcon icon={faPlus} />
          <input
            id="fileBtn"
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            ref={fileInput}
          />
        </label>
        {attachment && (
          <div id="selectImage">
            <img
              src={attachment}
              width="70px"
              height="70px"
              alt="uploadImage"
            />
            <button onClick={onClearAttachmentClick}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
      </ProfileStyle>
      <LogOutBtnStyle>
        <button onClick={onLogOutClick}>Log Out</button>
      </LogOutBtnStyle>
    </>
  );
};

export default Profile;
