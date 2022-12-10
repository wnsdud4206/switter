import styled from "styled-components";

const NavStyle = styled.nav`
  ul#navContainer {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 22px;

    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: center;

      & > button {
        /* 임시style */
        outline: none;
        background: none;
        border: none;
        padding: 0;

        color: var(--icon-color);
        width: 26px;
        height: 26px;

        cursor: pointer;
      }

      &:first-child {
        justify-content: flex-end;
      }

      &.newContent {
      }

      &.darkMode {
      }

      &#notification {
        position: relative;
        
        cursor: pointer;

        svg {
          /* color: #00acee; */
          /* color: var(--personal-color); */
          /* font-size: 50px; */

          pointer-events: none;
        }

        div#noticeOnIcon {
          display: none;

          background-color: #ff6633;

          width: 8px;
          height: 8px;

          border-radius: 50%;

          position: absolute;
          top: -5px;
          right: -5px;

          &.enable {
            display: block;
          }
        }
      }

      &#profileLink {
        a#myProfile {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          width: 26px;
          height: 26px;

          background-color: white;

          border-radius: 50%;

          overflow: hidden;

          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
`;

export default NavStyle;
