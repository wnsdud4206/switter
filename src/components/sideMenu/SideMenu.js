import styled from "styled-components";

const SideMenuStyle = styled.div`
  background-color: #666;

  flex-basis: 320px;
`;

const SideMenu = () => {
  return <SideMenuStyle>
    <div id="sideMenuHeader">
      photoUrl, currentUserName, option
    </div>
    <ul id="firends">
      <li className="firend">photoUrl, currentUserName, option</li>
    </ul>
    <div>copyRight</div>
  </SideMenuStyle>;
};

export default SideMenu;