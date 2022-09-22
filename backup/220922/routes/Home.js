import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  dbService,
  addDoc,
  collection,
  getDocs,
  query,
  // where,
  onSnapshot,
  orderBy,
  storageService,
  ref,
  uploadString,
  getDownloadURL,
} from "fbase";
import Sweet from "components/Sweet";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  // 읽기, 데이터 받아오기
  const getSweets = async () => {
    const dbSweets = await getDocs(collection(dbService(), "sweets"));
    setSweets([]);
    dbSweets.forEach((doc) => {
      const sweetObj = {
        ...doc.data(),
        id: doc.id,
        // id, text, creatorId, createdAt
      };
      // 왜 자꾸 뒤죽박죽으로 받아오지?? 저장할 때 뒤죽박죽인건가? - orderBy 로 정리
      setSweets((prev) => [sweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getSweets();
    const q = query(
      collection(dbService(), "sweets"),
      orderBy("createdAt"), // 순서 정렬
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // creatorId, createdAt, text
      }));
      setSweets(sweetArr);
    });
  }, []);

  // 쓰기, 데이터 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let attachmentUrl = "";
      if (attachment !== "") {
        // storage에 image 저장
        const attachmentRef = ref(storageService(), `${userObj.uid}/sweetImages/${uuidv4()}`);
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
      };
      // firestore에 추가
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(collection(dbService(), "sweets"), sweetObj);
      setSweet("");
      setAttachment("");      // 미리보기 사진 제거
      fileInput.current.value = "";   // 올리고 선택된 파일 해제
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on you mind?"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Sweet" />
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
      <div>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
