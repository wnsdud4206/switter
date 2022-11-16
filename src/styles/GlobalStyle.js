import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // props 받아와서 다크모드 여부
  ${({them}) =>
    them
      ? css`
          :root {
            --personal-color: black;
          }
        `
      : css`
          :root {
            --personal-color: white;
          }
        `}
  /* :root {
    --personal-color: black;
  } */
  /* @media (prefers-color-scheme: dark) {
    :root {
      --personal-color: #9953e2;
    }
  } */

  html, body, div#root {
    min-height: 100vh;
    
    scroll-behavior: smooth;

    margin: 0;
    padding: 0;

  }
  body {
    /* font-weight: bold; */
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    align-items: center;

    /* width: 100vw;
    overflow-x: hidden; */
    width: 100%;
    
    color: white;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: var(--personal-color);
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    div#root {
      
      width: 100%;

      position: relative;

      overflow-x: hidden;
      
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  }
`;

export default GlobalStyle;
