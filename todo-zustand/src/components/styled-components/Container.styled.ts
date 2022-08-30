import styled from "styled-components";

type Test = {
    property: string;
}

export const Conatiner = styled.div<Test>`
    margin: 50px;
`