import React, { useEffect, useState } from "react";
import {
  dbService,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "fbase";
import SweetFactory from "components/SweetFactory";
import SweetConatiner from "components/SweetConatiner";

const Home = ({ userObj, init }) => {
  const [sweets, setSweets] = useState([]);

  // 읽기, 데이터 받아오기
  const getSweets = async () => {
    try {
      const dbSweets = await getDocs(
        collection(dbService(), "sweets"),
        // orderBy("createdAt", "desc"),
      );
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
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // console.log(sweets)
    // console.log(userObj);

    getSweets();
    const q = query(
      collection(dbService(), "sweets"),
      orderBy("createdAt", "desc"), // 순서 정렬, 최신 sweet이 위에서 쌓이게 하고 싶기 때문에 "desc" 추가
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // creatorId, createdAt, text
      }));
      setSweets(sweetArr);
    });
  }, []);

  // dom 변경이 감지될까? event?
  // const [innerSize, setInnerSize] = useState(false);
  // const onResizeHandler = useCallback((e) => {
  //   if (window.innerHeight >= window.innerWidth) {
  //     setInnerSize(false);
  //   } else if (window.innerHeight < window.innerWidth) {
  //     setInnerSize(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(innerSize);
  //   window.addEventListener("resize", onResizeHandler);
  //   return () => {
  //     window.addEventListener("resize", onResizeHandler);
  //   };
  // }, [onResizeHandler, innerSize]);

  return (
    <>
      <SweetFactory userObj={userObj} />
      <SweetConatiner sweets={sweets} userObj={userObj} />
    </>
  );
};

export default Home;
