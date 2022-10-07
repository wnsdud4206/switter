import React, { useEffect, useState } from "react";
import {
  dbService,
  collection,
  getDocs,
  query,
  // where,
  onSnapshot,
  orderBy,
} from "fbase";
import Sweet from "components/Sweet";
import SweetFactory from "components/SweetFactory";
import HomeStyle from "styles/HomeStyle";

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

  return (
    <HomeStyle sweetLength={sweets.length}>
      <SweetFactory userObj={userObj} />
      <div id="sweetConatiner">
        <div id="sweetList">
          {sweets.length ? (
            sweets
              .sort((a, b) => {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
              })
              .map((sweet) => (
                <Sweet
                  key={sweet.id}
                  sweetObj={sweet}
                  isOwner={sweet.creatorId === userObj.uid}
                />
              ))
          ) : (
            <div id="loadingBox">Loading...</div>
          )}
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
