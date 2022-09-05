import styled from "styled-components";

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
  padding: 1rem;
  border-radius: 1rem;
  gap: 2rem;
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
