import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* * { */

    /* outline: 1px solid red !important; */
/* } */
    *, *:before, *:after {
        box-sizing: border-box;
        /* background: rgb(0 100 0 / 0.1) !important; */

    }
    :root {
        --gold:#ffb800;
        --beige:#f0e4c3;
        --black: #161616;
        --black-light: #252522;
        --gray: #636268;
        --gray-light: #636060;

        --h1:clamp(3rem, 3.7vw, 5.5rem);
        --h3-banner-clamp: clamp(2rem, 2.31vw, 4rem);
        --h3-banner-clamp-fallback-lg: 5rem;
        --h3-banner-clamp-fallback-md: 4rem;
        --h3-banner-fallback-sm: 2rem;

        --p-banner-clamp: clamp(1.4rem, 1.9vmax, 3rem);
        --p-banner-clamp-fallback-lg: 3rem;
        --p-banner-clamp-fallback-md: 1.6rem;
        --p-banner-clamp-fallback-sm: 1.4rem;

        --p-main-clamp: clamp(1.3rem, 1.9vmax ,2rem);
        --p-large-clamp: clamp(1.5rem, 3vmax, 3rem);

        --padding-one: clamp(2rem, 5vmax, 6rem);
        --padding-two: clamp(1.2rem, 1.9vmax, 2rem);
    }
    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
        /* min-height: -webkit-fill-available; */
    }
    body {
        font-size: 2rem;
        background-color: var(--black);
        transform: translate3d(0px, 0px, 0px,);
        transition: all 700ms ease;
        /* scroll-behavior: smooth; */
        /* overflow-x: visible !important; */
        /* min-height: -webkit-fill-available; */
        /* padding-bottom: env(safe-area-inset-bottom); */
    }
    p {
        line-height: 1.5;
        font-weight: 200;
        font-size: var(--p-main-clamp);
    }
    img {
        max-width: 100%;
    }
    button {
        color: white;
        border: 0;
        padding: 0.6rem 1rem;
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.2s;
    }
      /* Scrollbar Styles */
    body::-webkit-scrollbar {
        width: 12px;
    }
    html {
        scrollbar-width: thin;
        scrollbar-color: var(--beige) var(--black);
    }
    body::-webkit-scrollbar-track {
        background: var(--black);
    }
    body::-webkit-scrollbar-thumb {
        background-color: var(--beige) ;
        /* background-color: var(--black) ; */
        border-radius: 6px;
        border: 3px solid var(--black);
    }
    h3, p {
        color: var(--beige);
    }
    span {
        color: var(--gold);
    }

    .fixed-nav #header{
        background: rgba(22, 22, 22, 0.98);

    }
`;
export default GlobalStyles;
