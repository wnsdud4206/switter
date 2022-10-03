import React, { useCallback, useEffect, useRef, useState } from "react";
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

const Home = ({ userObj }) => {
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

  /* height을 받아오고 늦게 적용시키면? */
  // const sweetListHeight = (children) => {
  //   console.log(children);

  //   if (sweetListRef.current === undefined) return;
  //   let height;
  //   for (let child in children) {
  //     if (typeof children[child] === "object") {
  //       height += children[child].clientHeight;
  //     }
  //   }
  //   setSweetHeight(height + ((children.length - 1) * 24));
  // };

  // 각 sweet마다 transition height 효과주기 성공하면 지워도 될듯
  const listRef = useRef();
  const [boxSize, setBoxSize] = useState(0);
  const sweetContainerSize = useCallback(() => {
    setBoxSize(listRef.current.clientHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxSize]);
  useEffect(() => {
    console.log(listRef.current.clientHeight);
    sweetContainerSize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef.current, sweets.length]);

  return (
    <HomeStyle sweetLength={sweets.length} boxSize={boxSize}>
      <SweetFactory userObj={userObj} />
      <div id="sweetConatiner">
        <div id="sweetList" ref={listRef}>
          {sweets
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
                sweetContainerSize={sweetContainerSize}
              />
            ))}
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
