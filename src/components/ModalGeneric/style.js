import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    .form-control{
        background-color: #FFF !important;
        color: #000 !important;
        border-color: #CCCCCC !important;
        :disabled{
            background-color: #F2F2F2 !important;
            color: #999999 !important;
            border-color: #e2e2e2 !important;
        }
    }
`