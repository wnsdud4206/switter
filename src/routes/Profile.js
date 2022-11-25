import ContentsList from "components/content/ContentsList";
import LoadingBox from "components/loading/LoadingBox";
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
  getDoc,
  getDocs,
  orderBy,
  onSnapshot,
} from "fbase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const [profileObj, setProfileObj] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    const userQuery = query(
      collection(dbService(), "users"),
      where("displayName", "==", name),
    );

    onSnapshot(userQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setProfileObj(doc.data());
      });
    });
  }, [name]);

  const onEditing = () => {
    setEditing(!editing);
  };

  return (
    <>
      <ProfileStyle>
        {profileObj ? (
          <>
            {editing ? (
              <UserProfileEditor userObj={userObj} onEditing={onEditing} />
            ) : (
              <UserProfile
                userObj={userObj}
                profileObj={profileObj}
                onEditing={onEditing}
              />
            )}
            <div id="bottomBox">
              <ContentsList userObj={profileObj} />
              <SideMenu />
            </div>
          </>
        ) : (
          <LoadingBox text={"Profile Loading"} />
        )}
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
