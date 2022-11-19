import ContentsList from "components/home/ContentsList";
import SideMenu from "components/sideMenu/SideMenu";
import {
  authService,
  dbService,
  signOut,
  query,
  collection,
  where,
  getDocs,
  orderBy,
} from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileStyle = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 61px;
`;

const Profile = ({ userObj }) => {
  const [mySweets, setMySweets] = useState([]);

  const navigate = useNavigate();

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

      const mySweetArr = Object.values(querySnapshot.docs).map((doc) => ({
        id: doc.id,
        ...doc.data(), // creatorId, createdAt, text
      }));
      // console.log(mySweetArr);
      setMySweets(mySweetArr);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMySweets();
    // console.log(mySweets);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const profileImageFormat = async () => {
  //   await updateProfile(authService().currentUser, {
  //     photoURL: null,
  //   });
  // };

  return (
    <>
      <ProfileStyle>
        <ContentsList userObj={userObj} />
        <SideMenu />
      </ProfileStyle>

      {/* <div>
        profileHeader
          <nav>nav: myProfile(profileEdit, logOut, 계정삭제), myContent(mySweets, myComments), myFriends(친구찾기(추가), 친구삭제)</nav>
      </div> */}

      {/* <ProfileEdit userObj={userObj} />
      <SweetConatiner sweets={mySweets} userObj={userObj} /> */}

      {/* {true ? (
        <SweetConatiner sweets={mySweets} userObj={userObj} />
      ) : (
        <ProfileEdit userObj={userObj} />
      )} */}

      {/* <LogOutBtnStyle>
        <button onClick={onLogOutClick}>Log Out</button>
      </LogOutBtnStyle> */}

      {/* <button onClick={profileImageFormat}>profile image format button</button> */}
    </>
  );
};

export default Profile;
