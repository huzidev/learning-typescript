import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    body {
        font-family: sans-serif;
    }
    
    .container {
        background-color: ${(props) => props.dark ? "black" : "white"};
        color: ${(props) => props.dark ? "white" : "black"};
    }
    
`