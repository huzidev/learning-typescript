import styled from "styled-components";

interface Props {
    // bcz dark state will either be true or false
    dark: boolean;
}

export const Wrapper = styled.div<Props>`
    height: 100vh;
    width: 100%;
    background-color: ${((props) => props.dark ? 'black' : 'white')};
    transition: all 500ms ease-in-out;
`