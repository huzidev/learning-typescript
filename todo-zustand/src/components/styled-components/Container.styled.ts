import styled from "styled-components";

interface Props {
    // bcz dark state will either be true or false
    dark: boolean;
}

export const Wrapper = styled.div<Props>`
    background-color: ${((props) => props.dark ? "black" : "white")};
    color: ${((props) => props.dark ? "white" : "black")};
    transition: all 500ms ease-in-out;
`