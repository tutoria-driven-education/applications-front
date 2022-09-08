import styled, { css } from "styled-components";

export const Line = styled.div`
    display:flex;
    flex-direction:row;
`

export const Column = styled.div`
    display:flex;
    flex-direction:column;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex:1;
  font-size: 1.7rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  padding: 4rem;
  padding-top: 2rem;
  border-radius: 1rem;
  gap: 3rem;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
`;

export const TableContent = styled.div`
  display: grid;
  grid: auto / 1fr 1fr;
  row-gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  color: white;
`;

export const TableItem = styled.div`
  line-height: 2rem;
  background-color: #525268;
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 1px;
`;

export const ContainerSelect = styled.div`
    min-width: 250px;
    flex: 1;
    display: flex;
    box-shadow: 0.125rem 0.125rem 0.5rem #57545419;
    height:40px;
    div:first-child{
        width: 100%;
    }
`

export const ColumnChart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  background: #FFF;
  flex: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

export const LineLabels = styled.div`
  display:flex;
  flex-direction:row;
  gap: 10px;
  flex-wrap: wrap;
`

export const Label = styled.div`
  display:flex;
  flex-direction:row;
  align-items: center;
  gap: 5px;
`

export const LabelIndicator = styled.div`
  min-height: 10px;
  max-height: 10px;
  min-width: 10px;
  max-width: 10px;
  ${props => css`
    background: ${props.background};
  `}
`

export const LabelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  font-size: 12px;
`