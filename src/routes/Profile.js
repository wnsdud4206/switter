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

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  // const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newDisplayName, setNewDisplayName] = useState("");
  const fileInput = useRef();
  const [attachment, setAttachment] = useState(
    authService().currentUser.photoURL,
  );

  const onLogOutClick = () => {
    signOut(authService());
    navigate("/", { replace: true });
  };

  const getMySweets = async () => {
    try {
      const q = query(
        collection(dbService(), "sweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt"),
      );
      // eslint-disable-next-line no-unused-vars
      const querySnapshot = await getDocs(q);
      // state에 담고 map으로 출력
      // console.log(querySnapshot);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      // });
    } catch (error) {
      console.error(error);
    }
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

  const onSubmit = async (event) => {
    event.preventDefault();
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

  // const profileImageFormat = async () => {
  //   await updateProfile(authService().currentUser, {
  //     photoURL: null,
  //   });
  // };

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
      {/* <button onClick={profileImageFormat}>profile image format button</button> */}
    </>
  );
};

export default Profile;
