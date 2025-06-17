import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    /* 스크롤은 가능하지만 스크롤바만 숨김 */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar {
    display: none;
  }
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

  /* PDF 출력용 스타일 */
  @media print {
    html, body, #root {
      width: 210mm;
      height: 297mm;
      min-width: unset;
      min-height: unset;
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
      box-shadow: none !important;
      overflow: visible !important;
    }
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-shadow: none !important;
      background: transparent !important;
      overflow: visible !important;
      scrollbar-width: none !important;
    }
    ::-webkit-scrollbar {
      display: none !important;
    }
    @page {
      margin: 0;
      size: A4 portrait;
    }
    /* ProgramBookPage가 한 페이지에 하나씩 나오도록 */
    .pdf-page, [data-pdf-page], .ProgramBookPage__Print {
      width: 100vw;
      height: 297mm;
      min-height: 297mm;
      max-height: 297mm;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: visible !important;
      background: white !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    /* Review navigation, download, etc. 숨김 */
    .no-print, [data-no-print] {
      display: none !important;
    }
  }
`;

export default GlobalStyle;
