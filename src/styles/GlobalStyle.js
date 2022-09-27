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
      width: 400px;
    }
  }
`;

export default GlobalStyle;
