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

    div#root {
      width: 420px;
      
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
      }

    }
  }
`;

export default GlobalStyle;
