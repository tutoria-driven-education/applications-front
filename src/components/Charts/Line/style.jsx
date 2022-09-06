import styled, { css } from "styled-components";

export const Container = styled.div`
    display:flex;
    flex:1;
    ${props => !props.haveData && css`
        justify-content: center;
        align-items: center;
    `}
`