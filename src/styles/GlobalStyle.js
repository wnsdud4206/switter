import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div#root {
    height: 100%;

    margin: 0;
    padding: 0;

  }
  body {
    font-weight: bold;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;

    overflow-x: hidden;
    
    color: white;
    
    /* &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #444;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    } */

    div#root {
      width: 500px;
      
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
      }

    }
  }
`;

export default GlobalStyle;
