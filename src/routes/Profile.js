import ContentsList from "components/content/ContentsList";
import LoadingBox from "components/loading/LoadingBox";
import SideMenu from "components/sideMenu/SideMenu";
import UserProfile from "components/profile/UserProfile";
import UserProfileEditor from "components/profile/UserProfileEditor";
import { dbService, query, collection, where, onSnapshot } from "fbase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* width: 792px; */
  max-width: 792px;

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
      setProfileObj(null);
      snapshot.docs.forEach((doc) => setProfileObj(doc.data()));
    });
  }, [name, editing]);

  const onEditing = () => setEditing(!editing);

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
              <SideMenu userObj={userObj} />
            </div>
          </>
        ) : (
          <LoadingBox text={"Profile Loading"} />
        )}
      </ProfileStyle>
    </>
  );
};

export default Profile;
