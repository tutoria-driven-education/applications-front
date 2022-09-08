import styled, { css } from "styled-components";

export const Container = styled.div`
    display:flex;
    height:100%;
    ${props => !props.haveData && css`
        justify-content: center;
        align-items: center;
    `}
`