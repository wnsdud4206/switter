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
import { v4 as uuidv4 } from "uuid";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoURL !== attachment
    ) {
      const ok = window.confirm(
        "Are you sure you want to update your profile?",
      );
      if (ok) {
        // 기존 profile image 지우기, 현재 image url(userObj.photoURL)을 storage 안에서 자동으로 찾아 지우는 듯
        const r = ref(storageService(), userObj.photoURL);
        await deleteObject(r);

        try {
          let attachmentUrl = "";
          if (attachment !== "") {
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
          }

          await updateProfile(userObj, {
            displayName: newDisplayName,
            photoURL: attachmentUrl,
          });

          const { email, uid } = userObj;
          const newUserObj = {
            attachmentUrl,
            displayName: newDisplayName,
            email: email,
            uid: uid,
          };
          const newUser = doc(dbService(), "users", userObj.uid);
          const docRef = await setDoc(
            newUser,
            newUserObj,
            { capital: false },
            { merge: false },
          );

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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          ref={fileInput}
        />
        <input type="submit" value="Update Profile" />
        {attachment && (
          <div>
            <img
              src={attachment}
              width="50px"
              height="50px"
              alt="uploadImage"
            />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
