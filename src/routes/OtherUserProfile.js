import {
  authService,
  dbService,
  signOut,
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
} from "fbase";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SweetConatiner from "components/sweet/SweetConatiner";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import OtherUserProfileStyle from "styles/profile/OtherUserProfileStyle";

const OtherUserProfile = ({ userObj, otherUserId }) => {
  const [otherUserSweets, setOtherUserSweets] = useState([]);
  const [otherUserObj, setOtherUserObj] = useState({});
  const [attachment, setAttachment] = useState("");
  // const navigate = useNavigate();

  const [imgError, setImgError] = useState(false);

  const onError = () => {
    // 이미지 깨지면 대체
    setImgError(true);
  };

  // userObj 해당 user의 object로 받아오기

  const getOtherUserObj = async () => {
    try {
      const d = doc(dbService(), "users", otherUserId);
      const get = await getDoc(d);
      setOtherUserObj(get.data());
      setAttachment(get.data().attachmentUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const getOtherUserSweets = async () => {
    try {
      // sweets
      const q = query(
        collection(dbService(), "sweets"),
        where("creatorId", "==", otherUserId),
        orderBy("createdAt"),
      );
      // eslint-disable-next-line no-unused-vars
      const querySnapshot = await getDocs(q);
      // state에 담고 map으로 출력
      // console.log(querySnapshot);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      // });

      const mySweetArr = Object.values(querySnapshot.docs).map((doc) => ({
        id: doc.id,
        ...doc.data(), // creatorId, createdAt, text
      }));
      // console.log(mySweetArr);
      setOtherUserSweets(mySweetArr);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOtherUserSweets();
    getOtherUserObj();
    console.log(attachment);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const profileImageFormat = async () => {
  //   await updateProfile(authService().currentUser, {
  //     photoURL: null,
  //   });
  // };

  // return (
  //   <OtherUserProfileStyle>
  //     <div id="otherUesrAttachment">
  //       {attachment && !imgError ? (
  //         <img
  //           src={attachment}
  //           width="80px"
  //           height="80px"
  //           alt="profileImage"
  //           onError={onError}
  //         />
  //       ) : (
  //         <FontAwesomeIcon id="profileicon" icon={faUser} />
  //       )}
  //     </div>
  //     <span>{userObj.displayName}</span>

  //     <SweetConatiner sweets={otherUserSweets} userObj={userObj} />
  //   </OtherUserProfileStyle>
  // );
};

export default OtherUserProfile;
