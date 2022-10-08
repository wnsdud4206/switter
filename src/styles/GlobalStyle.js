import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div#root {
    min-height: 100vh;

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

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #00bdee;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    div#root {
      width: 500px;

      position: relative;
      
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  }
`;

export default GlobalStyle;
