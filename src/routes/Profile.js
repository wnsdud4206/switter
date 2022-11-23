import ContentsList from "components/content/ContentsList";
import SideMenu from "components/sideMenu/SideMenu";
import UserProfile from "components/UserProfile";
import UserProfileEditor from "components/UserProfileEditor";
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
import styled from "styled-components";

const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 792px;

  margin-top: 61px;

  div#bottomBox {
    display: flex;

    border-top: 1px solid var(--border-color);
  }
`;

const Profile = ({ userObj }) => {
  const [editing, setEditing] = useState(false);

  const onEditing = () => {
    setEditing(!editing);
  };

  return (
    <>
      <ProfileStyle>
        {editing ? (
          <UserProfileEditor userObj={userObj} onEditing={onEditing} />
        ) : (
          <UserProfile userObj={userObj} onEditing={onEditing} />
        )}
        <div id="bottomBox">
          <ContentsList userObj={userObj} />
          <SideMenu />
        </div>
      </ProfileStyle>

      {/* <div>
        profileHeader
          <nav>nav: myProfile(profileEdit, logOut, 계정삭제), myContent(myContents, myComments), myFriends(친구찾기(추가), 친구삭제)</nav>
      </div> */}

      {/* <ProfileEdit userObj={userObj} />
      <SweetConatiner contents={myContents} userObj={userObj} /> */}

      {/* {true ? (
        <SweetConatiner contents={myContents} userObj={userObj} />
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
