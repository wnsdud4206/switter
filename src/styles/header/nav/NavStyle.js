import styled from "styled-components";

const NavStyle = styled.nav`
  ul#navContainer {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 6px;

    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: center;

      & > button {
        /* 임시style */
        /* outline: none;
        background: none;
        border: none;
        padding: 0;

        color: var(--icon-color);
        width: 26px;
        height: 26px;

        cursor: pointer; */
      }

      &:first-child {
        justify-content: flex-end;
      }

      &.newContent {
      }

      &.darkMode {
      }

      &#sideBarToggle {
        display: none;

        @media (max-width: 850px) {
          display: block;
        }
      }

      &#notification {
        position: relative;

        cursor: pointer;

        button {
          svg {
            /* color: #00acee; */
            /* color: var(--personal-color); */
            /* font-size: 50px; */

            /* pointer-events: none; */
          }

          div#noticeOnIcon {
            display: none;

            background-color: #ff6633;

            width: 8px;
            height: 8px;

            border-radius: 50%;

            position: absolute;
            top: 2px;
            right: 2px;

            &.enable {
              display: block;
            }
          }
        }
      }

      &#profileLink {
        a#myProfile {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          width: 36px;
          height: 36px;

          border-radius: 50%;

          overflow: hidden;

          transition: background-color 0.2s;

          &:hover {
            background-color: rgba(128, 128, 128, 0.3);
          }

          svg {
            font-size: 26px;

            pointer-events: none;
          }
        }
      }
    }
  }
`;

export default NavStyle;
