import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
    box-sizing: border-box;
    }

    html {
    font-family: sans-serif;
    background: #fff;
    }

    body {
    margin: 0;
    }

    main {
    margin-top: 6rem;
    }
`;

export default GlobalStyles;
