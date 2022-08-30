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
        background-color: #292929;
        color: white;
        transition: all 700ms ease-in-out;
        .dark-mode {
            transition: all 700ms ease-in-out;
            color: white
        }
    }
    .light-mode {
        background-color: white;
        color: #292929;
        transition: all 700ms ease-in-out;
    }
    .toggle-dark-mode {
        cursor: pointer;
        width: 200px;
    }
`