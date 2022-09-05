import styled, { css } from "styled-components";

const shadowColor = {
    light: 'rgba(0,0,0,0.1)',
    dark: '#121111'
}

export const Container = styled.div`
    border-radius: 5px;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #d9d9d9;
    ${props => css`
        min-width: ${props.minWidth}px;
        box-shadow: 0.125rem 0.125rem 0.5rem ${shadowColor[props.theme]};
    `}
`

export const Title = styled.div`
    display: flex;
    padding: 20px;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`