import { createGlobalStyle } from "styled-components"

import { useStore } from "../store/index"

const store = useStore;

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

`