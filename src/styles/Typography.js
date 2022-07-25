import { createGlobalStyle } from "styled-components"


const Typography = createGlobalStyle`
    html {
        font-family: 'Lexend Deca',  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: var(--beige);
    }
    h1,h2,h3,h4,h5,h6,a {
        font-weight: normal;
        margin: 0;
    }

    p {
        font-weight: 200;
    }


`
export default Typography
