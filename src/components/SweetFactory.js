import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  storageService,
  ref,
  uploadString,
  getDownloadURL,
  collection,
  dbService,
} from "fbase";
import SweetFactoryStyle from "styles/SweetFactoryStyle";
import {
  faArrowRight,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState("");

  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  // useEffect(() => {
  //   // console.log(userObj);   // 20221002, 가입할때 바로 적용이 안됨, App.js에서 받아오는데 애초에 App.js에서부터 onSnapshot을 해줘야 하나?? - 임시로 sweet데이터에 authService().currentUser.displayName 적용
  //   console.log(authService().currentUser);
  // });

  // 쓰기, 데이터 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let attachmentUrl = "";
      if (attachment !== "") {
        // storage에 image 저장
        const attachmentRef = ref(
          storageService(),
          `${userObj.uid}/sweetImages/${uuidv4()}`,
        );
        // eslint-disable-next-line no-unused-vars
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url",
        );
        // image url 다운
        attachmentUrl = await getDownloadURL(attachmentRef);
      }
      const sweetObj = {
        text: sweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
        // displayName: authService().currentUser.displayName,
        // id: uuidv4()
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(collection(dbService(), "sweets"), sweetObj);
      setSweet("");
      setAttachment(""); // 미리보기 사진 제거
      fileInput.current.value = ""; // 올리고 선택된 파일 해제
    } catch (error) {
      console.error(error);
    }
    // try {
    //   const docRef = await addDoc(collection(dbService(), "sweets"), {
    //     text: sweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (error) {
    //   console.error(error);
    // }
    // setSweet("");
  };

  // input
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  // storage, image upload
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
    <SweetFactoryStyle onSubmit={onSubmit}>
      <fieldset>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on you mind?"
          maxLength={120}
        />
        <label htmlFor="submitBtn">
          <FontAwesomeIcon icon={faArrowRight} />
          <input id="submitBtn" type="submit" value="Sweet" />
        </label>
      </fieldset>
      <label htmlFor="fileBtn">
        Add photo
        <FontAwesomeIcon icon={faPlus} />
        <input
          id="fileBtn"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
      </label>
      {attachment && (
        <div id="selectImage">
          <img src={attachment} width="70px" height="70px" alt="uploadImage" />
          <button onClick={onClearAttachmentClick}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
    </SweetFactoryStyle>
  );
};

export default SweetFactory;
