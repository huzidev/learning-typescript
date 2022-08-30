import styled from "styled-components";

interface Props {
    dark: boolean;
}

export const Tets = styled.div<Props>`
    margin: 50px;
    background-color: ${((props) => props.dark ? "black" : "white")};
`