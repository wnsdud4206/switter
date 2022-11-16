import styled from "styled-components";

const NavStyle = styled.nav`
  ul#navContainer {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 22px;

    padding: 0;
    margin: 0;

    /* outline: 1px solid white; */

    li {
      display: flex;
      justify-content: center;

      /* outline: 1px solid white; */

      & > button {
        /* 임시style */
        outline: none;
        background: none;
        border: none;
        padding: 0;

        color: white;
        width: 25px;
        height: 25px;
        /* outline: 1px solid red; */

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
        cursor: pointer;

        svg {
          /* color: #00acee; */
          /* color: var(--personal-color); */
          /* font-size: 50px; */

          pointer-events: none;
        }
      }

      &#profileLink {
        a#myProfile {
          display: flex;
          flex-direction: column;
          align-items: center;

          span {
            color: white;
            font-size: 12px;

            text-align: center;

            flex-wrap: nowrap;

            margin-top: 4px;
          }
        }
      }
    }
  }
`;

export default NavStyle;
