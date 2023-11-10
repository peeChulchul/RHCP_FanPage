import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    :root {
    /* colors */
    --color-bg: var(--color-pink);
    --color-primary: var(--color-yellow);
    --color-primary-alt:var(--color-blue);
    --color-accent: var(--color-red);
    --color-text: var( --color-white);

    --color-pink : #FAD1D7;
    --color-yellow:#FFEC88;
    --color-blue:#36499B;
    --color-red:#ED1C25;
    --color-dark-pink:#F2D7E4;
    --color-black: #000000de;
    --color-white: #ffffff;

    /* spacing */
    --spacing: 4px;

    --font-xl: 3rem;
    --font-lg: 2rem;
    --font-md: 1.25rem;
    --font-sm:0.875rem
    }
    /* 공통 */
    * {
    box-sizing: border-box;
    color: var(--color-text);
    }
    button{
        background-color: transparent;
        border:none;
        padding:0px;
    }
    body{
        background-color: var(--color-bg);
    }
`;

export default GlobalStyles;
