import styled from "styled-components";

const SideMenuStyle = styled.div`
  background-color: #666;

  flex-basis: 320px;

  margin-top: 32px;

  @media (max-width: 850px) {
    display: none;
  }
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
