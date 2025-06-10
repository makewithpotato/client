import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    color-scheme: only light;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  :root {
    line-height: 1.5;
    font-weight: 400;
  }
  body {
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    background: #FCF7F7;
    color: #222;
    min-width: 320px;
    min-height: 100vh;
  }
  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }
  h1 {
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 32px;
    margin: 0 0 0.5em 0;
    line-height: 1.1;
  }
  h2 {
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 22px;
    margin: 0 0 0.5em 0;
  }
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export default GlobalStyle;
