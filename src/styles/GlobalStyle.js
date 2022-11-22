import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // props 받아와서 다크모드 여부
  ${({them}) =>
    them
      ? css`
          :root {
            --icon-color: #9953e2;
            --sub-color: white;
            --background-color: black;
            --border-color: rgb(98, 98, 98);
          }
        `
      : css`
          :root {
            --icon-color: black;
            --sub-color: black;
            --background-color: white;
            --border-color: rgb(212, 212, 212);
          }
        `}
  /* :root {
    --icon-color: black;
  } */
  /* @media (prefers-color-scheme: dark) {
    :root {
      --icon-color: #9953e2;
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
    
    color: var(--sub-color);

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: var(--icon-color);
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    div#root {
      display: flex;
      justify-content: center;
      
      background-color: var(--background-color);
      
      width: 100%;

      position: relative;

      overflow-x: hidden;

      transition: background-color .2s;
      
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  }
`;

export default GlobalStyle;
