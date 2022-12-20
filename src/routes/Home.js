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

  div#testBox {
    /* */
    width: 100px;
    max-width: 120px;
    /* */

    height: 100px;
    outline: 1px solid powderblue;

    position: fixed;
    top: 50%;
    left: 50%;

    z-index: 100000;
  }
`;

const Home = ({ userObj }) => (
  <HomeContainerStyle>
    <div id="testBox">dddddddddddd</div>
    <ContentsList userObj={userObj} />
    <SideBar userObj={userObj} />
  </HomeContainerStyle>
);

export default React.memo(Home);
