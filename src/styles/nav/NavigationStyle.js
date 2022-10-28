import styled from "styled-components";

const NavigationStyle = styled.nav`
  background-color: rgba(0, 0, 0, 0.8);

  /* margin: 0; */
  margin-top: 16px;
  padding: 8px 0;

  box-sizing: border-box;

  // 개발자도구의 모바일로 보면 nav가 좀 위로 올라가는데 실제 모바일로보면 괜찮음
  position: sticky;
  top: 0;
  /* bottom: 869px; */
  z-index: 1;

  /* outline: 1px solid #777; */

  ul {
    list-style: none;

    margin: 0;
  }

  ul#navContainer {
    list-style: none;
    display: flex;
    justify-content: center;

    padding: 0;

    li {
      display: flex;
      justify-content: center;

      width: 120px;

      /* outline: 1px solid white; */

      &:first-child {
        justify-content: flex-end;
      }

      &#homeLink {
      }

      &#notification {
        cursor: pointer;

        svg {
          color: #00acee;
          font-size: 50px;

          pointer-events: none;
        }
      }

      &#profileLink {
      }

      a {
        text-decoration: none;

        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        /* outline: 1px solid orange; */
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
        font-size: 50px;

        &#twitterIcon {
        }
        &#profileicon {
        }
      }
    }
  }
`;

export default NavigationStyle;
