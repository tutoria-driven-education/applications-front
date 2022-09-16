import styled, { css } from "styled-components";

export const BaseInput = styled.div`
    box-shadow: 0.125rem 0.125rem 0.5rem #57545419;
    display: flex;
    min-height: 40px;
    max-height: 40px;
    gap: 5px;
    padding: 0px;
    align-items: center;
    width:100%;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #CCCCCC !important;
    background-color: #FFF !important;
    ${props => props.haveValue && css`
        padding-right: 0px !important;
    `}
    ${props => props.disabled && css`
        background-color: #F2F2F2 !important;
        color:#999999 !important;
        border-color: #e2e2e2 !important;
        pointer-events: none !important;
    `}
    .Calendar__weekDay {
        text-decoration: none !important;
        pointer-events: none !important;
    }

    .custom-calendar {
        border-radius: 4px !important;
    }

`

export const BaseFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: #ff7bbd;
    color: white;
    font-size: 14px;
    font-weight: bold;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
`

export const ContainerRemove = styled.div`
    transition: 0.3s all;
    color: #CCCCCC;
    :hover{
        color: #999999;
    }
    padding: 5px;
    margin-right: 5px;
`