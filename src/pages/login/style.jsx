import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  padding: 0 64px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #000;

  @media (max-width: 600px) {
    padding: 32px 8px;
  }
`;

export const AuthWrapper = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  border: 1px dashed var(--driven-color);

  position: relative;

  display: flex;
  gap: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthLabel = styled.div`
  padding: 0 8px;

  position: absolute;

  top: -16px;
  left: 24px;

  font-size: 32px;
  color: #fff;

  background-color: #000;
`;

export const Box = styled.form`
  width: 50%;
  max-width: 60rem;
  height: 250px;
  background-color: var(--darker);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 1.5rem;

  @media (max-width: 600px) {
    width: 100%;
    height: calc(100vh - 6rem);
    justify-content: space-evenly;
    border-radius: 0;
  }
`;
