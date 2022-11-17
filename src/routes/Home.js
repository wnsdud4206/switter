import React, { useEffect } from "react";
import ContentsList from "components/home/ContentsList";
import SideMenu from "components/sideMenu/SideMenu";
import styled from "styled-components";

const HomeContainerStyle = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 61px;
`;

const Home = ({ userObj, init, getId }) => {

  return (
    <>
      <HomeContainerStyle>
        <ContentsList userObj={userObj} />
        <SideMenu />
      </HomeContainerStyle>

      {/* <div style={{backgroundColor: "white", width: "100px", height: "100px"}}></div> */}
      {/* <SweetFactory userObj={userObj} />
      <SweetConatiner sweets={sweets} userObj={userObj} getId={getId} /> */}
    </>
  );
};

export default React.memo(Home);
