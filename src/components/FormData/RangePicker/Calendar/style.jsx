import styled, { css } from "styled-components";

export const BaseInput = styled.div`
    box-shadow: 0.125rem 0.125rem 0.5rem #57545419;
    display: flex;
    min-height: 40px;
    max-height: 40px;
    gap: 5px;
    align-items: center;
    width:100%;
    cursor: pointer;
    :disabled{
        background: #F2F2F2 !important;
        border: 1px solid #E6E6E6;
        color:#999999;
    }
    :focus{
        box-shadow:none !important;
        outline:2px solid #2684FF !important;
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

export const Container = styled.div`
    ${props => props.theme === 'dark' && css`
        .Calendar__monthArrow{
            color: white !important;
        }

        .Calendar__monthText ,.Calendar__yearText{
            color:#FFF !important;
            :hover{
                background-color: #ff7bbd !important;
                border-radius: 4px !important;
            }
        }

        .Calendar__day {
            :hover{
                background-color: #ff7bbd !important;
            }
            color: #FFF !important;
        }

        .-disabled{
            :hover{
                background-color: transparent !important;
            }
            color: #999999 !important;
        }

        .-selectedBetween {
            :hover{
                background-color: transparent !important;
            }
            color:#ff7bbd !important;
        }

        .custom-calendar{
            background-color: #343434 !important;
        }
    `}
`