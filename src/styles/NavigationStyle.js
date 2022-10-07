import styled from "styled-components";

const NavigationStyle = styled.nav`
  background-color: rgba(0, 0, 0, 0.8);

  /* margin: 0; */
  margin-top: 16px;
  padding: 8px 0;

  box-sizing: border-box;

  position: sticky;
  top: 0;
  /* bottom: 869px; */

  /* outline: 1px solid red; */

  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    margin: 0;
    padding: 0;

    li {
      display: flex;

      width: 100%;

      &:first-child {
        justify-content: flex-end;
      }

      &.homeLink {
      }
      &.profileLink {
      }

      a {
        text-decoration: none;

        display: flex;
        flex-direction: column;
        align-items: center;
        width: 120px;
      }

      a:not(#myProfile) {
      }

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

      a > svg {
        color: #00acee;
        width: 50px;
        height: 50px;

        &#twitterIcon {
        }
        &#profileicon {
        }
      }
    }
  }
`;

export default NavigationStyle;
