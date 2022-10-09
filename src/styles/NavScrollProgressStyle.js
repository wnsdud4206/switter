import styled from "styled-components";

const NavScrollProgressStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.8);

  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  div#progress {
    background-color: #00acee;
    height: 2px;

    transition: width .2s ease-out;
  }
`;

export default NavScrollProgressStyle;
