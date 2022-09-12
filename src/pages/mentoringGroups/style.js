import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  padding: 4rem;
  padding-top: 2rem;
  border-radius: 1rem;
  gap: 3rem;
  font-size: 1.7rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  background-color: #000;

  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;

  padding: 2rem 0;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
`;

export const ContainerSelect = styled.div`
  min-width: 250px;
  flex: 1;
  display: flex;
  box-shadow: 0.125rem 0.125rem 0.5rem #57545419;
  height: 40px;

  div:first-child {
    width: 100%;
  }
`;
