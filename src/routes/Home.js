import React from "react";
import ContentsList from "components/content/ContentsList";
import SideBar from "components/sideBar/SideBar";
import styled from "styled-components";

const HomeContainerStyle = styled.div`
  display: flex;
  justify-content: center;

  /* width: 792px; */
  max-width: 792px;

  margin-top: 61px;
`;

const Home = ({ userObj }) => (
  <HomeContainerStyle>
    <ContentsList userObj={userObj} />
    <SideBar userObj={userObj} />
  </HomeContainerStyle>
);

export default React.memo(Home);
