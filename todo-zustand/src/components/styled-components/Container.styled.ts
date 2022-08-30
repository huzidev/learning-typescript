import styled from "styled-components";

interface Props {
    // bcz dark state will either be true or false
    dark: boolean;
}

export const Wrapper = styled.div<Props>`
    margin: 50px;
    background-color: ${((props) => props.dark ? "black" : "white")};
`