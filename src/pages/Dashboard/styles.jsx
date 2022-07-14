import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100%;

  font-size: 1.7rem;

`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 80%;
  height: 100%;
  max-width: 1440px;
  margin-top: 1rem;
  padding: 1rem;

  background-color: #7D7D8E;
  border-radius: 1rem;

`

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  gap: 1rem;
`

export const TableContent = styled.div`
  display: grid;
  grid: auto / 1fr 1fr;
  row-gap: 1rem;

  margin-top: 1rem;
  width: 100%;

  color: white;
`

export const TableItem = styled.div`
  line-height: 2rem;
  background-color: #525268;
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 1px;
  
`