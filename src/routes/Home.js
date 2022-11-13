import React, { useEffect } from "react";
import ContentsBox from "components/home/ContentsBox";
import SideMenu from "components/sideMenu/SideMenu";
import styled from "styled-components";

const HomeContainerStyle = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = ({ userObj, init, getId }) => {

  return (
    <>
      <HomeContainerStyle>
        <ContentsBox></ContentsBox>
        <SideMenu />
      </HomeContainerStyle>

      {/* <div style={{backgroundColor: "white", width: "100px", height: "100px"}}></div> */}
      {/* <SweetFactory userObj={userObj} />
      <SweetConatiner sweets={sweets} userObj={userObj} getId={getId} /> */}
    </>
  );
};

export default Home;
