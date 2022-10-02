import styled from "styled-components";

const NavigationStyle = styled.nav`
  /* outline: 1px solid white; */

  margin: 0;
  margin-top: 50px;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    padding: 0;

    li {
      display: flex;

      width: 100%;

      &:first-child {
        justify-content: flex-end
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
