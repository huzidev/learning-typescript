import { createGlobalStyle } from "styled-components"

import { useStore } from "../store/index"

const Store = useStore;

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    .dark-mode {
        background-color: black;
        color: white;
        transition: all 700ms ease-in-out;
    }
    .light-mode {
        background-color: white;
        color: black;
        transition: all 700ms ease-in-out;
    }
 
`